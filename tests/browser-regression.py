"""Live regression. Uses one clearly tagged enquiry and deletes only that fixture.

Requires playwright and Chrome. Supply ADMIN_TEST_PIN through the environment.
Run against the local app with TEST_BASE_URL (defaults to localhost:3000).
"""
import json
import os
import time
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '.workspace' / 'admin-review'
OUT.mkdir(parents=True, exist_ok=True)
BASE = os.environ.get('TEST_BASE_URL', 'http://localhost:3000')
PIN = os.environ.get('ADMIN_TEST_PIN', '')
assert len(PIN) == 6, 'ADMIN_TEST_PIN must be supplied'
ENV = {}
for line in (ROOT / '.env.local').read_text().splitlines():
    if '=' in line and not line.startswith('#'):
        key, value = line.split('=', 1)
        ENV[key] = value.strip().strip('\"').strip("'")

results = []
runtime_errors = []
fixture = {'id': None, 'email': f'qa.regression.{int(time.time())}@example.invalid'}
name = 'QA Regression ' + fixture['email'].split('.')[2].split('@')[0]
message = 'Temporary QA fixture. Verify contact delivery, dashboard counts, search, filters, details, and status persistence. This record is removed by the regression harness.'

def check(label, fn):
    try:
        fn()
        results.append({'name': label, 'ok': True})
        print('PASS ' + label, flush=True)
    except Exception as error:
        # Keep assertions/diagnostics free of customer enquiry content and cookies.
        results.append({'name': label, 'ok': False, 'error': type(error).__name__})
        print('FAIL ' + label + ': ' + type(error).__name__, flush=True)

def require(condition, message='Assertion failed'):
    if not condition:
        raise AssertionError(message)

def no_overflow(page):
    require(page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'))

def login(page):
    page.goto(BASE + '/admin/login')
    page.get_by_label('6-digit password', exact=True).fill(PIN)
    page.get_by_role('button', name='UNLOCK', exact=True).click()
    page.wait_for_url('**/admin/dashboard', timeout=30000)
    expect(page.locator('.admin-stat')).to_have_count(4, timeout=30000)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    page = context.new_page()
    page.on('pageerror', lambda error: runtime_errors.append(str(error)))
    try:
        page.goto(BASE)
        page.wait_for_load_state('networkidle')
        page.get_by_role('heading', level=1).wait_for()
        check('Home loads with all portfolio sections', lambda: require(all(page.locator('#' + key).count() == 1 for key in ['home','about','experience','skills','cases','simulator','certs','contact'])))
        check('All local navigation anchors resolve', lambda: require(page.locator('a[href^="#"]').evaluate_all('(links)=>links.every(a=>a.hash.length<2 || !!document.getElementById(a.hash.slice(1)))')))
        check('Resume download is available', lambda: require(context.request.get(BASE + '/files/Shashank_Shinde_Resume.pdf').status == 200))
        for width in [360, 390, 768, 1024, 1440, 1920]:
            page.set_viewport_size({'width':width, 'height':900})
            page.wait_for_timeout(250)
            check(f'Portfolio has no horizontal overflow at {width}px', lambda: no_overflow(page))
            if width in [390,768,1440]:
                page.screenshot(path=str(OUT / f'portfolio-{width}.png'))
        page.set_viewport_size({'width':390,'height':844})
        def public_menu():
            page.get_by_role('button',name='Open navigation').click()
            page.locator('#navigation-links').get_by_role('link',name='Projects',exact=True).click()
            expect(page.locator('#navigation-links')).not_to_be_visible()
            require(page.url.endswith('#cases'))
        check('Mobile portfolio navigation opens and navigates', public_menu)
        page.set_viewport_size({'width':1440,'height':1000})
        def project_expansion():
            button=page.get_by_role('button',name='Explore case study').first
            button.click()
            require(button.get_attribute('aria-expanded') == 'true')
            button.click()
            require(button.get_attribute('aria-expanded') == 'false')
        check('Project case studies expand and collapse', project_expansion)
        def test_runner():
            page.get_by_role('button',name='RUN TEST SUITE').click()
            expect(page.get_by_text('✓ Finished',exact=True)).to_be_visible(timeout=30000)
        check('Interactive automation suite completes', test_runner)
        def bugs():
            buttons=page.locator('button[aria-label^="Inspect BUG-"]')
            require(buttons.count()==3)
            for i in range(3):
                buttons.nth(i).click()
                expect(buttons.nth(i)).to_have_attribute('aria-pressed','true')
            page.get_by_role('button',name='REVEAL QA ROOT CAUSE & FIX').click()
            expect(page.locator('button[aria-controls="bug-fix-details"]')).to_have_attribute('aria-expanded','true')
        check('Bug lab cases and reveal interaction work', bugs)
        form=page.locator('.contact-form')
        def validation():
            form.get_by_role('button',name='Send message').click()
            expect(page.locator('#fullName-error')).to_be_visible()
            expect(page.locator('#email-error')).to_be_visible()
            expect(page.locator('#message-error')).to_be_visible()
            page.locator('#fullName').fill(name)
            page.locator('#email').fill('invalid-email')
            page.locator('#mobile').fill('123')
            page.locator('#reason').select_option(label='General Inquiry')
            page.locator('#message').fill(message)
            form.get_by_role('button',name='Send message').click()
            expect(page.locator('#email-error')).to_be_visible()
            expect(page.locator('#mobile-error')).to_be_visible()
            page.locator('#email').fill(fixture['email'])
            page.locator('#mobile').fill('2025550100')
        check('Contact required fields, email, and mobile validation', validation)
        def form_failure():
            page.route('**/api/enquiries',lambda route: route.fulfill(status=503,content_type='application/json',body=json.dumps({'success':False,'message':'Please try again.'})))
            form.get_by_role('button',name='Send message').click()
            expect(form.get_by_role('alert')).to_be_visible()
            expect(page.locator('#email')).to_have_value(fixture['email'])
            page.unroute('**/api/enquiries')
        check('Contact API failure preserves entered details', form_failure)
        def submit():
            with page.expect_response(lambda response: response.url.endswith('/api/enquiries') and response.request.method=='POST', timeout=30000) as pending:
                form.get_by_role('button',name='Send message').click()
            response=pending.value
            require(response.status==201)
            fixture['id']=response.json()['data']['id']
            expect(page.get_by_role('dialog')).to_be_visible()
            expect(page.get_by_text('Message received.',exact=True)).to_be_visible()
            page.get_by_role('button',name='Got it').click()
        check('Valid contact reaches Supabase and shows success', submit)
        def footer_entry():
            page.locator('footer').get_by_role('link',name='Shashank Shinde',exact=True).click()
            page.wait_for_url('**/admin/login')
        check('Footer name opens private admin login', footer_entry)
        def visibility():
            field=page.get_by_label('6-digit password',exact=True)
            field.fill('123456')
            expect(field).to_have_attribute('type','password')
            page.get_by_role('button',name='Show password',exact=True).click()
            expect(field).to_have_attribute('type','text')
            expect(field).to_have_value('123456')
            page.get_by_role('button',name='Hide password',exact=True).click()
            expect(field).to_have_attribute('type','password')
            field.fill('12345')
            page.get_by_role('button',name='UNLOCK',exact=True).click()
            expect(page.get_by_text('Password must be exactly 6 digits.')).to_be_visible()
        check('Password eye toggles and six-digit validation works', visibility)
        check('Correct PIN opens authenticated dashboard', lambda: login(page))
        def stats():
            response=context.request.get(BASE+'/api/admin/dashboard')
            require(response.status==200)
            values=response.json()
            actual=page.locator('.admin-stat strong').all_text_contents()
            expected=[str(values[k]) for k in ['total_enquiries','new_enquiries','read_enquiries','resolved_enquiries']]
            require(actual==expected)
            require(values['total_enquiries']==sum(values[k] for k in ['new_enquiries','read_enquiries','resolved_enquiries']))
        check('Dashboard cards exactly match database statistics', stats)
        for width in [360,390,768,1024,1440,1920]:
            page.set_viewport_size({'width':width,'height':900})
            check(f'Dashboard has no horizontal overflow at {width}px',lambda:no_overflow(page))
            if width==390: page.screenshot(path=str(OUT/'dashboard-mobile.png'))
        page.set_viewport_size({'width':390,'height':844})
        def admin_menu():
            expect(page.locator('#admin-navigation')).not_to_be_visible()
            page.get_by_role('button',name='Open menu',exact=True).click()
            expect(page.locator('#admin-navigation')).to_be_visible()
            require(page.locator('#admin-navigation').evaluate('(el)=>el.contains(document.activeElement)'))
            page.keyboard.press('Escape')
            expect(page.get_by_role('button',name='Open menu',exact=True)).to_be_focused()
        check('Mobile admin menu opens, focuses, and closes with Escape',admin_menu)
        page.set_viewport_size({'width':1440,'height':1000})
        page.get_by_role('link',name='Enquiries',exact=True).click()
        expect(page.locator('.admin-table tbody tr')).not_to_have_count(0,timeout=30000)
        def rows_match():
            response=context.request.get(BASE+'/api/enquiries')
            require(response.status==200)
            rows=response.json()['data']
            require(page.locator('.admin-table tbody tr').count()==len(rows))
            require(all(rows[i]['created_at'] >= rows[i+1]['created_at'] for i in range(len(rows)-1)))
        check('Enquiries display all database rows newest first',rows_match)
        search=page.get_by_role('textbox',name='Search enquiries')
        def search_checks():
            for value in [name,fixture['email'],'2025550100']:
                search.fill(value)
                expect(page.locator('.admin-table tbody tr')).to_have_count(1)
            search.fill('no-match-qa-regression')
            expect(page.get_by_text('No matching enquiries.',exact=True)).to_be_visible()
            search.fill(fixture['email'])
        check('Search by name/email/mobile and no-match state',search_checks)
        for width in [360,390,768,1024,1440,1920]:
            page.set_viewport_size({'width':width,'height':900})
            check(f'Enquiries have no document overflow at {width}px',lambda:no_overflow(page))
        page.set_viewport_size({'width':390,'height':844})
        def details():
            row=page.locator('.admin-table tbody tr').first
            row.focus()
            page.keyboard.press('Enter')
            expect(page.get_by_role('dialog')).to_be_visible()
            expect(page.get_by_role('dialog').get_by_text(message,exact=True)).to_be_visible()
            no_overflow(page)
            page.screenshot(path=str(OUT/'enquiry-details-mobile.png'))
            page.keyboard.press('Escape')
            expect(row).to_be_focused()
        check('Enquiry details work on mobile and restore keyboard focus',details)
        def status_changes():
            require(fixture['id'] is not None)
            for state,button in [('read','Mark as Read'),('resolved','Mark as Resolved')]:
                page.locator('.admin-table tbody tr').first.click()
                page.get_by_role('dialog').get_by_role('button',name=button,exact=True).click()
                expect(page.get_by_role('dialog').locator('.status-chip')).to_have_text(state.capitalize(),timeout=20000)
                page.keyboard.press('Escape')
                page.get_by_role('button',name=state.capitalize(),exact=True).click()
                expect(page.locator('.admin-table tbody tr')).to_have_count(1)
                page.get_by_role('button',name='All',exact=True).click()
            page.reload()
            search.fill(fixture['email'])
            expect(page.locator('.admin-table tbody .status-chip')).to_have_text('Resolved',timeout=30000)
        check('Read/resolved changes persist and filters update',status_changes)
        def logout():
            page.set_viewport_size({'width':1440,'height':1000})
            cookies=context.cookies()
            old=next(c['value'] for c in cookies if c['name']=='qa_admin_access')
            page.get_by_role('button',name='Logout',exact=True).click()
            page.wait_for_url('**/admin/login',timeout=20000)
            replay=p.request.new_context(base_url=BASE,extra_http_headers={'Cookie':'qa_admin_access='+old})
            require(replay.get('/api/enquiries').status==401)
            replay.dispose()
            page.goto(BASE+'/admin/dashboard')
            page.wait_for_url('**/admin/login')
        check('Logout destroys session and protects direct/replayed access',logout)
        reduced=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce')
        rp=reduced.new_page()
        rp.goto(BASE)
        rp.wait_for_load_state('networkidle')
        check('Reduced-motion mobile hero stays within viewport',lambda:no_overflow(rp))
        reduced.close()
        check('No uncaught browser JavaScript errors',lambda:require(not runtime_errors))
    finally:
        if fixture['id']:
            key=ENV['SUPABASE_SERVICE_ROLE_KEY']
            url=(ENV.get('SUPABASE_URL') or ENV['NEXT_PUBLIC_SUPABASE_URL'])+'/rest/v1/enquiries?id=eq.'+fixture['id']+'&email=eq.'+fixture['email']
            request=urllib.request.Request(url,method='DELETE',headers={'apikey':key,'Authorization':'Bearer '+key,'Prefer':'return=minimal'})
            try:
                with urllib.request.urlopen(request,timeout=20) as response:
                    check('Temporary enquiry cleaned up',lambda:require(response.status==204))
            except Exception:
                results.append({'name':'Temporary enquiry cleaned up','ok':False})
        browser.close()
        summary={'passed':sum(r['ok'] for r in results),'total':len(results),'results':results,'runtime_error_count':len(runtime_errors)}
        (OUT/'browser-results.json').write_text(json.dumps(summary,indent=2))
        print(json.dumps({'passed':summary['passed'],'total':summary['total']}),flush=True)

raise SystemExit(0 if all(r['ok'] for r in results) else 1)

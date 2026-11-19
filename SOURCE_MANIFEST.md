# Source preservation manifest

Baseline: 253 files, captured before implementation. Original files present: 253; deleted: 0. Modified originals: 28; untouched originals: 225.

Original backup: `C:\Users\shash\OneDrive\Desktop\Projects\PORTFOLIO\portfolio-preservation\20261117-234749\source-backup.zip`. The file was marked read-only. SHA-256: `ee01a8bb35b5c6dc6fde16b5d4e9027cb48b96aa3950111ce0a1c55298beec7a`. ZIP integrity was verified. This is a versioned source snapshot, not an immutable storage service.

Exclusions: generated dependencies/builds, Git metadata, audit outputs, TypeScript incremental cache and private `.env` files. The ZIP also excludes these and includes `.env.example`. Existing user changes were preserved as the baseline.

## Preservation map

| Capability | Treatment / evidence |
| --- | --- |
| All original component folders | Retained; no original input file deleted. The previously absent ProjectPreviews path now re-exports the retained implementation. |
| Project and career data | Twelve collections structurally equal in `content-preservation.json`; all case-study route files and data source remain byte-identical. |
| QADoorsFrame / SkillDoorWall / standalone | Native frame is canonical; alternate component retained; standalone theme synchronized. Old handlers superseded only by equivalent pointer/focus/motion lifecycle behavior as described in CHANGELOG. |
| Hero metrics/copy | All retained in the My QA practice disclosure. Duplicate header/hero card actions are visually consolidated into menu/card launcher equivalents. |
| Timeline | Single selected card superseded by full visible chronology and scroll-following year; all source data, arrow/dot selection and keyboard controls retained. |
| Project presentation | Homepage list retained; shared overlapping monitor/phone stacks now replace independent project scenes on specialties. All original technical sections, previews, links and detailed case studies retained. |
| QA lab | Same eight artifacts; former mouse/touch handlers superseded by equivalent pointer pan with inertia, plus keyboard/list access. |
| Contact | Same five stages and choices; corrected request schema and success confirmation; backend unchanged. |
| Other tools and admin | Original files retained; routes smoke-tested; anonymous/security tests pass; authenticated flow skipped without configured test PIN. |

Incremental pre-correction snapshot: `C:\Users\shash\OneDrive\Desktop\Projects\PORTFOLIO\portfolio-preservation\stack-correction-20261118-003818\before-stack.zip`. The corrected stack audit is in `PROJECT_STACK_AUDIT.md`.


## Every original file

| Path | Status | Before SHA-256 | After SHA-256 |
| --- | --- | --- | --- |
| `.env.example` | untouched | `7ac02373dd5241e98c236797a61661a47e0629989fb26838e3c2fa764c6aeb41` | `7ac02373dd5241e98c236797a61661a47e0629989fb26838e3c2fa764c6aeb41` |
| `.gitignore` | modified | `85b9918e55fe437c0b559b17abf8ea1ec9d282a26d868bdb7aad4d4143cdc4e5` | `a8e1bff4add92c9a145dc8920501482f540c04bcef4474bcbe82b934eb481cfd` |
| `.prettierignore` | untouched | `a0ab34b9cd9654dc9e1c96d95d129fe6748eb530bfaf271761098a08d429470a` | `a0ab34b9cd9654dc9e1c96d95d129fe6748eb530bfaf271761098a08d429470a` |
| `.prettierrc` | untouched | `5d5a35a48e29a64d5238282be6e588318229f3b897ef088c369a76dee283f5d4` | `5d5a35a48e29a64d5238282be6e588318229f3b897ef088c369a76dee283f5d4` |
| `AEO_CONTENT_ARCHITECTURE.md` | untouched | `4b85ac452c35d0c533887fd6417b2df607090bfa2349d19ddc05f3f3e099821e` | `4b85ac452c35d0c533887fd6417b2df607090bfa2349d19ddc05f3f3e099821e` |
| `AEO_CONTENT_MAP.md` | untouched | `e9d2458a6a27a25dc0806762d6e46ec86ace9ab73480a4527c8d3965b7803c27` | `e9d2458a6a27a25dc0806762d6e46ec86ace9ab73480a4527c8d3965b7803c27` |
| `AEO_FACT_CHECK.md` | untouched | `725182675a4ccba7563f74bb6b2ad22ab58218ca360c3ac059e3cf9de012078d` | `725182675a4ccba7563f74bb6b2ad22ab58218ca360c3ac059e3cf9de012078d` |
| `AEO_RECHECK_GUIDE.md` | untouched | `f07d3139a6bc0bfee6f7fbf0503bb7e73c1846fb86babb1d2376dea6c9fc8d45` | `f07d3139a6bc0bfee6f7fbf0503bb7e73c1846fb86babb1d2376dea6c9fc8d45` |
| `AEO_TECHNICAL_AUDIT.md` | untouched | `5a3c03ec964730827eda9df562be2767150e05a2c70366a3d245a7816e33390b` | `5a3c03ec964730827eda9df562be2767150e05a2c70366a3d245a7816e33390b` |
| `AGENTS.md` | untouched | `e2e2955a93eb37b176d49f63643c68fedaa7661997f3f02f4afa7bfef7e224ab` | `e2e2955a93eb37b176d49f63643c68fedaa7661997f3f02f4afa7bfef7e224ab` |
| `AI_PRESENCE_CHECKLIST.md` | untouched | `93ff76588e5691954617690bdb78403e33390d1b8a22fc51f80ba659856de46d` | `93ff76588e5691954617690bdb78403e33390d1b8a22fc51f80ba659856de46d` |
| `AI_QUERY_TEST_SET.md` | untouched | `f4fec014655da125fc4045af5eeb6f76cbd3dcc42e5e30005d1b813628846e5e` | `f4fec014655da125fc4045af5eeb6f76cbd3dcc42e5e30005d1b813628846e5e` |
| `AI_VISIBILITY_MEASUREMENT.md` | untouched | `55a92d3645d94080bde1207a28a7c806d736d9460523414e2a3a7203dc181d5c` | `55a92d3645d94080bde1207a28a7c806d736d9460523414e2a3a7203dc181d5c` |
| `CONTENT_AUTHORITY_PLAN.md` | untouched | `042b25de8b9aad189545feda227a39165980d1a1c5e809655f6d315c92997e93` | `042b25de8b9aad189545feda227a39165980d1a1c5e809655f6d315c92997e93` |
| `CRO_MEASUREMENT_PLAN.md` | untouched | `2b8dc668bf5046bca5592b0d87cd79aa6902b72d18d99f445bbcfff13d39e99a` | `2b8dc668bf5046bca5592b0d87cd79aa6902b72d18d99f445bbcfff13d39e99a` |
| `FINAL_AEO_AUDIT.md` | untouched | `7a22bdaf68ae939a729d11c2b00142c537ce75bfb1c757f1bc35e45c128cf1c6` | `7a22bdaf68ae939a729d11c2b00142c537ce75bfb1c757f1bc35e45c128cf1c6` |
| `FINAL_PORTFOLIO_OPTIMIZATION_AUDIT.md` | untouched | `e58ef15af12de0081ad886bf2c79ffc3aa4cbbe214f368fa98467ac47b02721f` | `e58ef15af12de0081ad886bf2c79ffc3aa4cbbe214f368fa98467ac47b02721f` |
| `FINAL_QA_RELEASE_REPORT.md` | untouched | `15d64283c4e91014d9a2fd359c232844e692daf46624e344a31ec8f1341cef6a` | `15d64283c4e91014d9a2fd359c232844e692daf46624e344a31ec8f1341cef6a` |
| `GEO_AUDIT.md` | untouched | `eef5223db958ddcc9ef85a9a334af5b2c9566b975d2e58cbb12f4f4431d00488` | `eef5223db958ddcc9ef85a9a334af5b2c9566b975d2e58cbb12f4f4431d00488` |
| `GEO_AUTHORITY_PLAN.md` | untouched | `6b1e199574fc89e066194bc5fc3ca9f90005d5960924b3346c71a317e9083e35` | `6b1e199574fc89e066194bc5fc3ca9f90005d5960924b3346c71a317e9083e35` |
| `GITHUB_AEO_PLAN.md` | untouched | `df36f0a0dbb81bf7d7d26764d74dcd96b57352eb0f9cf8e5ddfb8eecc34e62c2` | `df36f0a0dbb81bf7d7d26764d74dcd96b57352eb0f9cf8e5ddfb8eecc34e62c2` |
| `INDEXING_CHECKLIST.md` | untouched | `3d7ec08de13a77a175dee80a00e4eab9be80e8cb72ad2c8e7e90c55d6fda96db` | `3d7ec08de13a77a175dee80a00e4eab9be80e8cb72ad2c8e7e90c55d6fda96db` |
| `LINKEDIN_AEO_PLAN.md` | untouched | `48a6a15eee475a3814d19f1c246996415603b347ab1aa2725f1cd3c7f8019aa5` | `48a6a15eee475a3814d19f1c246996415603b347ab1aa2725f1cd3c7f8019aa5` |
| `OPTIMIZATION_STATE.md` | untouched | `cbe0fe414b1972d1da3cb19ff38103b973c2129eca66ce0b41ad06750f6f485d` | `cbe0fe414b1972d1da3cb19ff38103b973c2129eca66ce0b41ad06750f6f485d` |
| `POST_DEPLOYMENT_GROWTH_PLAN.md` | untouched | `0a867ca7348aa0e74edf95b8a7155e69bd2402a191a13634dee8d86352a8fd4e` | `0a867ca7348aa0e74edf95b8a7155e69bd2402a191a13634dee8d86352a8fd4e` |
| `QA_BASELINE.md` | untouched | `878b32bd6893a4b846098cf9ea8d438a1f7871abd87a35d1b9dbb6cf63c8575b` | `878b32bd6893a4b846098cf9ea8d438a1f7871abd87a35d1b9dbb6cf63c8575b` |
| `QA_BUG_REPORT.md` | untouched | `a5986f274966c29e3bd7f0a361e21ce4ef70cd1d666e502467afa4462ac1b98b` | `a5986f274966c29e3bd7f0a361e21ce4ef70cd1d666e502467afa4462ac1b98b` |
| `QA_ROUTE_MATRIX.md` | untouched | `efd87ff6994bc858702df2ee9eaafa3b5d5781f6240acae07d9e02c878b8c8f4` | `efd87ff6994bc858702df2ee9eaafa3b5d5781f6240acae07d9e02c878b8c8f4` |
| `QA_TEST_EXECUTION_REPORT.md` | untouched | `9fe8fa803b30261527849250f74280b5260bac55b71b06e8c59c57343f983dc4` | `9fe8fa803b30261527849250f74280b5260bac55b71b06e8c59c57343f983dc4` |
| `RESPONSIVE_TEST_REPORT.md` | untouched | `d8ce1d268523decb4977a0e2f298b41a0ba754de9013bf06b24150811b6d7a24` | `d8ce1d268523decb4977a0e2f298b41a0ba754de9013bf06b24150811b6d7a24` |
| `SEO_AUDIT.md` | untouched | `0875763439d8dc6b497d3c434b4a814310950097ce24b539145d56339d867bc6` | `0875763439d8dc6b497d3c434b4a814310950097ce24b539145d56339d867bc6` |
| `SXO_UXO_AUDIT.md` | untouched | `36b27cf0d31ed07b0e7539f66449818ca5e149f1bf025cbe3bea6fe64904bd24` | `36b27cf0d31ed07b0e7539f66449818ca5e149f1bf025cbe3bea6fe64904bd24` |
| `admin/components/Dashboard/AdminDashboard.css` | untouched | `e4e5449c913ad9fb12ce9f4dce723cab7a07a3ed16cd8bd2018acba631136b63` | `e4e5449c913ad9fb12ce9f4dce723cab7a07a3ed16cd8bd2018acba631136b63` |
| `admin/components/Dashboard/AdminDashboardPage.tsx` | untouched | `ce8385953d238c1f5e6e9459cd63462e16eef0afe7a5376c2308b3bb48548268` | `ce8385953d238c1f5e6e9459cd63462e16eef0afe7a5376c2308b3bb48548268` |
| `admin/components/Enquiries/AdminEnquiries.css` | untouched | `a1cb55595bf976ae28b95b7790c75f5021b4eb025476ba9138e7fc8e2ff9044c` | `a1cb55595bf976ae28b95b7790c75f5021b4eb025476ba9138e7fc8e2ff9044c` |
| `admin/components/Enquiries/AdminEnquiriesPage.tsx` | untouched | `b212ff53e65184798abaf89f01867ae1ade9e13cdf1d9814e8b4d48e03387008` | `b212ff53e65184798abaf89f01867ae1ade9e13cdf1d9814e8b4d48e03387008` |
| `admin/components/Login/AdminLogin.css` | untouched | `aa3f51fdced06b7db1960fcf86d6686cd1daa577bb6d773c2d577f820b9d2e88` | `aa3f51fdced06b7db1960fcf86d6686cd1daa577bb6d773c2d577f820b9d2e88` |
| `admin/components/Login/AdminLoginPage.tsx` | untouched | `2a99b4218e5073bfcb87d5b9246ef3f976a8b62dfdafb3f982f6d1133f872a2b` | `2a99b4218e5073bfcb87d5b9246ef3f976a8b62dfdafb3f982f6d1133f872a2b` |
| `admin/components/Login/AdminParticleBurst.tsx` | untouched | `dd1677c919b23f963e9ad070924086615f45689c8109438ac2af306869050c5b` | `dd1677c919b23f963e9ad070924086615f45689c8109438ac2af306869050c5b` |
| `admin/components/Login/AdminSuccessCheck.tsx` | untouched | `1a0bfc8db1c622d3cecc5b7cbd313d9a670eadbcc4aab0d9f957643f203faf11` | `1a0bfc8db1c622d3cecc5b7cbd313d9a670eadbcc4aab0d9f957643f203faf11` |
| `admin/components/Login/AdminVerificationRing.tsx` | untouched | `825a1dcb7a56dbfc764b024eaddd27e1119fe45b6a1766240da753826e664b98` | `825a1dcb7a56dbfc764b024eaddd27e1119fe45b6a1766240da753826e664b98` |
| `admin/components/Login/types.ts` | untouched | `588dc5232e929ea9b86f6f52581ea1a491725f1a664d643aa25177df4ee27d8b` | `588dc5232e929ea9b86f6f52581ea1a491725f1a664d643aa25177df4ee27d8b` |
| `admin/components/Shell/AdminShell.css` | untouched | `4f1475bebd8819815cc2d9174a99aea33d65bf832b73753ca85151a3e9942674` | `4f1475bebd8819815cc2d9174a99aea33d65bf832b73753ca85151a3e9942674` |
| `admin/components/Shell/AdminShell.tsx` | untouched | `f9c14cf1092a2df14d7ca65aac2ee6772bd5a17d7d55c8bfdefeabe63857590f` | `f9c14cf1092a2df14d7ca65aac2ee6772bd5a17d7d55c8bfdefeabe63857590f` |
| `app/about/page.tsx` | untouched | `8884fb92506d8cda1bc47613d15e8161de4ad496dc4213515b7a4b5c8c4f049c` | `8884fb92506d8cda1bc47613d15e8161de4ad496dc4213515b7a4b5c8c4f049c` |
| `app/admin/dashboard/page.tsx` | untouched | `fdf24559f2fe38741e074eae7d76d996dd1fb9db86dea5461f23a93067ff8b1e` | `fdf24559f2fe38741e074eae7d76d996dd1fb9db86dea5461f23a93067ff8b1e` |
| `app/admin/enquiries/page.tsx` | untouched | `df771eb34d56f17983132155d04543127ecf52718596533f8e988b55bdeff64f` | `df771eb34d56f17983132155d04543127ecf52718596533f8e988b55bdeff64f` |
| `app/admin/layout.tsx` | untouched | `e74d87385987dee6f6afd88702e73f35965eca6bb20fc7fe8176ae78b2f1d50b` | `e74d87385987dee6f6afd88702e73f35965eca6bb20fc7fe8176ae78b2f1d50b` |
| `app/admin/login/page.tsx` | untouched | `1669a458d96e31f14d5d0a23e9996a5977399c93d5c5c300bc3a00ce281cead3` | `1669a458d96e31f14d5d0a23e9996a5977399c93d5c5c300bc3a00ce281cead3` |
| `app/admin/page.tsx` | untouched | `c2c639dcd3508054ca6d40928e15335e38ae8036b21f668a3a294af7b55248e5` | `c2c639dcd3508054ca6d40928e15335e38ae8036b21f668a3a294af7b55248e5` |
| `app/api-testing/page.tsx` | untouched | `2953d8d6abf1d87a62d5e39235f4502856c050898a3267280ea6df0017238457` | `2953d8d6abf1d87a62d5e39235f4502856c050898a3267280ea6df0017238457` |
| `app/api/admin/[...slug]/route.ts` | untouched | `47fcacd36e46a696c6c103e5e981ae8e72d05fdcb986f6fe1ed7e331835ab0bb` | `47fcacd36e46a696c6c103e5e981ae8e72d05fdcb986f6fe1ed7e331835ab0bb` |
| `app/api/enquiries/[id]/route.ts` | untouched | `9bc954582d321329c919ae17dfa88d056defd463a3d741810fa110d54366d95a` | `9bc954582d321329c919ae17dfa88d056defd463a3d741810fa110d54366d95a` |
| `app/api/enquiries/route.ts` | untouched | `16d5bcb4e88f499a5980aa4092272c3b2411858f20708259aa51160b5ee9618f` | `16d5bcb4e88f499a5980aa4092272c3b2411858f20708259aa51160b5ee9618f` |
| `app/api/pulse/route.ts` | untouched | `8a5e0a22a98d7390ef9b07a51dff5e2f6d5c3abb53c9817d5e51f9852475cfd6` | `8a5e0a22a98d7390ef9b07a51dff5e2f6d5c3abb53c9817d5e51f9852475cfd6` |
| `app/api/whatsapp/webhook/route.ts` | untouched | `0a9be2973344f38d2db83d0bf4efefd5d8b316358fd3d6ae02ff0d6322927283` | `0a9be2973344f38d2db83d0bf4efefd5d8b316358fd3d6ae02ff0d6322927283` |
| `app/automation-testing/page.tsx` | untouched | `02fec2339dc06227214cdb95461efbdaaf7610452fee1b8fef169b31a9b5bcae` | `02fec2339dc06227214cdb95461efbdaaf7610452fee1b8fef169b31a9b5bcae` |
| `app/contact/page.tsx` | untouched | `ad09c002ead42933fb1ac40ec82c93bed97059b431d472615b1c9ca30adff3b0` | `ad09c002ead42933fb1ac40ec82c93bed97059b431d472615b1c9ca30adff3b0` |
| `app/experience/page.tsx` | untouched | `105979549cc775fb0e2cab60eb1fbe113ecc0ff73cfd6a16a7b80cf66e5033fb` | `105979549cc775fb0e2cab60eb1fbe113ecc0ff73cfd6a16a7b80cf66e5033fb` |
| `app/globals.css` | modified | `7510736e8169695a6f2efa80f8aa5d854586158ef270abe97c10df9c294083c9` | `332c704a09891ce8533e76fe40d9ae45006066fa8e019d9f9f59e9c36909cd71` |
| `app/home/page.tsx` | untouched | `a99bfe2a781d8429738f1d52c0d80e60e9825fe6997cfb6e2482d0bc6b9578cb` | `a99bfe2a781d8429738f1d52c0d80e60e9825fe6997cfb6e2482d0bc6b9578cb` |
| `app/layout.tsx` | modified | `80d31cee61864bbe9cccae971d73e06680b3ea26ea864104c88f7fe8fbab72bc` | `6b456ec15a48163b36efb0bea3d54c9842bcabd233a37ec6b823aba8d05d49fa` |
| `app/legal/legal.css` | untouched | `39d93f10c58bd74a170173d2daf43081f61831432092b1b85b2bd97cf07d322f` | `39d93f10c58bd74a170173d2daf43081f61831432092b1b85b2bd97cf07d322f` |
| `app/legal/page.tsx` | modified | `ebba3ed431493bc7687751a8d09b755ff06dab7de083712fae6c1bbf755775b4` | `2472c2c8e63f8acbb1a2d3e6591a3857b30c92aa51a93b2caaca26171262b863` |
| `app/manual-testing/page.tsx` | untouched | `c9961bb3b888a4bed236ac217d7df35b9d314c8c083aa6f71bf7ebaac9555273` | `c9961bb3b888a4bed236ac217d7df35b9d314c8c083aa6f71bf7ebaac9555273` |
| `app/mobile-testing/page.tsx` | untouched | `6f7f16f864d66bb7595152849affcfc5ce3c32b474971a4466f17f65629ccfa5` | `6f7f16f864d66bb7595152849affcfc5ce3c32b474971a4466f17f65629ccfa5` |
| `app/my-story/my-story.css` | untouched | `12b09aaff222e8f4172dee0036b5ea889a755c094ace8393ae3b1a82280a9ed8` | `12b09aaff222e8f4172dee0036b5ea889a755c094ace8393ae3b1a82280a9ed8` |
| `app/my-story/page.tsx` | untouched | `ff63979516f4d19c702ef17197212df3ee7a42efd3fe0445d9e9fa30d5da792c` | `ff63979516f4d19c702ef17197212df3ee7a42efd3fe0445d9e9fa30d5da792c` |
| `app/not-found.css` | untouched | `918781e381e887fd72dfda109b69051e27e4c692aea63697454edfe0c24eb18b` | `918781e381e887fd72dfda109b69051e27e4c692aea63697454edfe0c24eb18b` |
| `app/not-found.tsx` | untouched | `81ccf1a59baf6f14f8a3eaeb5837e7a6b2a64af0d3d11dc4b1f1f545cc7a167f` | `81ccf1a59baf6f14f8a3eaeb5837e7a6b2a64af0d3d11dc4b1f1f545cc7a167f` |
| `app/page.tsx` | modified | `7856c4deaf7040344a524aca4450f548b61c73d0352f6d4807bcc5f208cef948` | `b8bf08443d297cd28844b5183b48dd565161c46c70bd46171991a72ce3e223d3` |
| `app/performance-testing/page.tsx` | untouched | `19b4fa3ccf51d2750a0eb0e03767b3f46b5bccb4d4af8e70cb672608df055dee` | `19b4fa3ccf51d2750a0eb0e03767b3f46b5bccb4d4af8e70cb672608df055dee` |
| `app/projects/driwe-qa-case-study/page.tsx` | untouched | `6c70fb2b73969b65c2a52bf53666ffce8d9daebbdcddce4d2a3fd505476965fb` | `6c70fb2b73969b65c2a52bf53666ffce8d9daebbdcddce4d2a3fd505476965fb` |
| `app/projects/ecommerce-testing-case-study/page.tsx` | untouched | `d476aefcc9aeac84e201da8977096921a0063470a71cfcfc8391f35a689945a0` | `d476aefcc9aeac84e201da8977096921a0063470a71cfcfc8391f35a689945a0` |
| `app/projects/grosido-qa-case-study/page.tsx` | untouched | `59de988221a485e9f678e4174f110a9576e2cdc0c23b6d6f012ca1bf95e36747` | `59de988221a485e9f678e4174f110a9576e2cdc0c23b6d6f012ca1bf95e36747` |
| `app/projects/page.tsx` | untouched | `6cf10a4a7637e2e43d68edf08753d19e2dddf916fb7bc10e5b0b0758255587c4` | `6cf10a4a7637e2e43d68edf08753d19e2dddf916fb7bc10e5b0b0758255587c4` |
| `app/projects/ride-sharing-testing-case-study/page.tsx` | untouched | `d38961de48975ce157daeb28c3939e5289180cf63dc56185592c8afd17875ea3` | `d38961de48975ce157daeb28c3939e5289180cf63dc56185592c8afd17875ea3` |
| `app/projects/urban-build-testing-case-study/page.tsx` | untouched | `df95bc71a6bcfaa15bf414bd60f3b9890b8d1898a93f66c2cca439a18bcbe5b3` | `df95bc71a6bcfaa15bf414bd60f3b9890b8d1898a93f66c2cca439a18bcbe5b3` |
| `app/qa-lab/page.tsx` | untouched | `5c5a5bc8b7bafb1a203d535dd497b22d6d8350e8b60b2645466bdf354592a321` | `5c5a5bc8b7bafb1a203d535dd497b22d6d8350e8b60b2645466bdf354592a321` |
| `app/skills/api-testing/page.tsx` | untouched | `4d65912016d97f04b75bf6f6fc42313722cc44935d6f2e0ed7eae3e90f274bd4` | `4d65912016d97f04b75bf6f6fc42313722cc44935d6f2e0ed7eae3e90f274bd4` |
| `app/skills/mobile-testing/page.tsx` | untouched | `ecade7ce402d0117232c018a957630b5746b5db92030252ce34a2f2358ccc209` | `ecade7ce402d0117232c018a957630b5746b5db92030252ce34a2f2358ccc209` |
| `app/skills/page.tsx` | untouched | `cdcb02a87d4c8162330dd06a3e8bab45a7c1720dfc505d93d8c116eaccb6e801` | `cdcb02a87d4c8162330dd06a3e8bab45a7c1720dfc505d93d8c116eaccb6e801` |
| `app/skills/performance-testing/page.tsx` | untouched | `460e71be8b308397d3034813ca7c30f1a49419c947f0d65acb1efc5f448a2b1c` | `460e71be8b308397d3034813ca7c30f1a49419c947f0d65acb1efc5f448a2b1c` |
| `app/skills/playwright-automation/page.tsx` | untouched | `99c0150a4e5eb52ec5f696fccfeba8a60775d35544b9add44fe3afa0c250d3d3` | `99c0150a4e5eb52ec5f696fccfeba8a60775d35544b9add44fe3afa0c250d3d3` |
| `app/skills/selenium-automation/page.tsx` | untouched | `e41e6ace1e527cedf0189f3a999ce26c7df3eb2d9b142f0b5b8c5310849de9c3` | `e41e6ace1e527cedf0189f3a999ce26c7df3eb2d9b142f0b5b8c5310849de9c3` |
| `app/work/page.tsx` | untouched | `f905d432f1ef375ee147047f354a45324ae08db8094ef9bf6e587df9686b5030` | `f905d432f1ef375ee147047f354a45324ae08db8094ef9bf6e587df9686b5030` |
| `backend/.env.example` | untouched | `37fdf9d39d21d298542476d30eb2bc4a349e9b48a75256989d31a782758a3589` | `37fdf9d39d21d298542476d30eb2bc4a349e9b48a75256989d31a782758a3589` |
| `backend/.gitignore` | untouched | `ee07d8e0c77573a9b108ff251cd4c71d5df13408409947aba8599cf7c312a692` | `ee07d8e0c77573a9b108ff251cd4c71d5df13408409947aba8599cf7c312a692` |
| `backend/config/db.js` | untouched | `d56967eaad5ef170040672d8e2dd47de62d524cb4410715543231c18bcdbbcd2` | `d56967eaad5ef170040672d8e2dd47de62d524cb4410715543231c18bcdbbcd2` |
| `backend/config/mailer.js` | untouched | `b29fbe96f9052e5da7e062efb9a73c5fdbef299f53c67e75c1a22c14783a94b9` | `b29fbe96f9052e5da7e062efb9a73c5fdbef299f53c67e75c1a22c14783a94b9` |
| `backend/package-lock.json` | untouched | `3946cf0d4425a78f25e3a3db03655442a8c1bf835fb562a1df3457c83628f88d` | `3946cf0d4425a78f25e3a3db03655442a8c1bf835fb562a1df3457c83628f88d` |
| `backend/package.json` | untouched | `64ae83868b235d45a5d160082e525a2a8ec8218a832f8dc63c8ae4badf658b11` | `64ae83868b235d45a5d160082e525a2a8ec8218a832f8dc63c8ae4badf658b11` |
| `backend/routes/contact.js` | untouched | `36976dbb710bc4886a46030a2dbb72447015e9a5e150f85b25a12e828ad162ca` | `36976dbb710bc4886a46030a2dbb72447015e9a5e150f85b25a12e828ad162ca` |
| `backend/server.js` | untouched | `512517942dc7a41d0b1fcbf3ebe5795115c1fa62f3b3869db1d7d988fa89b82d` | `512517942dc7a41d0b1fcbf3ebe5795115c1fa62f3b3869db1d7d988fa89b82d` |
| `bun.lock` | untouched | `f4cca6a2ce89569cda205d7c1e5e03f10d735f049e1bb6053737f16f19de380f` | `f4cca6a2ce89569cda205d7c1e5e03f10d735f049e1bb6053737f16f19de380f` |
| `bunfig.toml` | untouched | `239560b0153b165e0af29cb37aac6ee093b2868c5241a501d8edce610d733970` | `239560b0153b165e0af29cb37aac6ee093b2868c5241a501d8edce610d733970` |
| `components.json` | untouched | `4587d143275ee744003e8f9814dcc735c7fb8c56ea198db773fe2c27fdfcb53d` | `4587d143275ee744003e8f9814dcc735c7fb8c56ea198db773fe2c27fdfcb53d` |
| `eslint.config.js` | modified | `dee4925a9e15386569d661198e0fd805257cb9de86d78924c92bd59fdd7787c1` | `c6ac9417f49d3150dd1567d4acd4ad21c7bfd6585a17f61428ca637c2d5c40e6` |
| `next-env.d.ts` | modified | `b8b3a344484b959af5e4e3fc1a1609dac3cb9ece0cdeb6c145be29bc4c491000` | `5d820949a6e2178f09a3bcf441f74de3a5c6ae901d51e5c9f629819b41ea4a49` |
| `next.config.mjs` | modified | `2b15327e6c046b1df12bc877a6fdd42fc69ce464148226c4c94c5bccea1151f1` | `a5440c1e4424fd2eeec2a1d8ca5707b4742a291b4ac86ce961693bd6fd406736` |
| `package-lock.json` | untouched | `5ada1f3a4f3e550d51de3bac0602725b7a8ad74fe1fc6f2ca49dff89cc49498c` | `5ada1f3a4f3e550d51de3bac0602725b7a8ad74fe1fc6f2ca49dff89cc49498c` |
| `package.json` | untouched | `d0bd9dfb39991baf9f6123657010f9a834626d4ae29f9c5bfe57a82c3e07ce72` | `d0bd9dfb39991baf9f6123657010f9a834626d4ae29f9c5bfe57a82c3e07ce72` |
| `postcss.config.mjs` | untouched | `7b299d3d3b16699ddda397c0b2373b3af4f25f8fc9ccc9b3d9e64ef083bc1c21` | `7b299d3d3b16699ddda397c0b2373b3af4f25f8fc9ccc9b3d9e64ef083bc1c21` |
| `proxy.ts` | untouched | `db53918055684b731780785887e9785dede652813f9a559adafd73267b91f275` | `db53918055684b731780785887e9785dede652813f9a559adafd73267b91f275` |
| `public/91285c30ae1a43bdada96ae3b552634f.txt` | untouched | `78c0c79356f689ed0c75ebff1bc99016d798640d38355468f09fcc496d81d46b` | `78c0c79356f689ed0c75ebff1bc99016d798640d38355468f09fcc496d81d46b` |
| `public/apple-touch-icon.png` | untouched | `37d0d5c195bc47b40f79f2d3758151df9eb6067f84f9f2e23d22acaf24f39753` | `37d0d5c195bc47b40f79f2d3758151df9eb6067f84f9f2e23d22acaf24f39753` |
| `public/e5d7a8c4f9214b7bb901b0b5c1638210.txt` | untouched | `3718c56f63c2e949fb484924fc74246f5fc2e8111e7177507363e30f27d1bde4` | `3718c56f63c2e949fb484924fc74246f5fc2e8111e7177507363e30f27d1bde4` |
| `public/favicon-16x16.png` | untouched | `1e6d359ef519075d121222322bd9f755c8375a4f170c6d631144047b0e15bbcf` | `1e6d359ef519075d121222322bd9f755c8375a4f170c6d631144047b0e15bbcf` |
| `public/favicon-32x32.png` | untouched | `ecc70422e40af4f0e1a1b3f8898d648e3340e49c1743f26b0f271ec2fb654c3e` | `ecc70422e40af4f0e1a1b3f8898d648e3340e49c1743f26b0f271ec2fb654c3e` |
| `public/favicon.ico` | untouched | `9c55e0bb371a9c64a535aa1896c8b6394f6f3aaf1e46128e1d7833f88ef72667` | `9c55e0bb371a9c64a535aa1896c8b6394f6f3aaf1e46128e1d7833f88ef72667` |
| `public/favicon.svg` | untouched | `0a21be82344971b750a4475b2537b43a1635643c894eb19871803cf08ccf6569` | `0a21be82344971b750a4475b2537b43a1635643c894eb19871803cf08ccf6569` |
| `public/files/Shashank_Shinde_Resume.pdf` | untouched | `55ab6521fb37f944e419249652ea4cc02d3a7aeb321167fa107e8d2b5fbe7c02` | `55ab6521fb37f944e419249652ea4cc02d3a7aeb321167fa107e8d2b5fbe7c02` |
| `public/files/Shashank_Shinde_Resume_Detailed.pdf` | untouched | `7006b41e284514177dd9448ae2866df4c06177fb24602493b895af86b172effb` | `7006b41e284514177dd9448ae2866df4c06177fb24602493b895af86b172effb` |
| `public/fonts/Inter-OFL.txt` | untouched | `f14f2b95a38f4f20cad4d27f7710593f37534c046641be0348da7c28365f4e39` | `f14f2b95a38f4f20cad4d27f7710593f37534c046641be0348da7c28365f4e39` |
| `public/fonts/inter-latin-variable.woff2` | untouched | `3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62` | `3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62` |
| `public/googlebcc3fd247517937d.html` | untouched | `dad63482d624956891c8dd51e938a63a9f4be67f64d1521d9c613d22486fc11e` | `dad63482d624956891c8dd51e938a63a9f4be67f64d1521d9c613d22486fc11e` |
| `public/images/og-image.png` | untouched | `b1eea7bac447ed9eda970fba76bf3ea71b111b7b56c27502acc59bbdca1542aa` | `b1eea7bac447ed9eda970fba76bf3ea71b111b7b56c27502acc59bbdca1542aa` |
| `public/images/projects/driwe-preview.svg` | untouched | `beb93733c6ce89767305d25557f4aed8503cb129fb6c82a925470fd9ec348ade` | `beb93733c6ce89767305d25557f4aed8503cb129fb6c82a925470fd9ec348ade` |
| `public/images/projects/ecommerce-preview.svg` | untouched | `168803dc3dc929099fb94ae369e08f5e5f304497e2d0e035316500e8a46df230` | `168803dc3dc929099fb94ae369e08f5e5f304497e2d0e035316500e8a46df230` |
| `public/images/projects/grosido-preview.svg` | untouched | `eda04534e7f9bfce25b9114a43de30f04f8091b4e78d7f01271bba5779356b2b` | `eda04534e7f9bfce25b9114a43de30f04f8091b4e78d7f01271bba5779356b2b` |
| `public/images/projects/loadbench-preview.svg` | untouched | `92097ab7ca94aab979ef5c362c059e0bfad3ff545257157dff4c1a0344635bc3` | `92097ab7ca94aab979ef5c362c059e0bfad3ff545257157dff4c1a0344635bc3` |
| `public/images/projects/manualtriage-preview.svg` | untouched | `41b3a02bb479ff8c66723de7868bc64dd2fc44664ee76df4a57fb6ba2d684102` | `41b3a02bb479ff8c66723de7868bc64dd2fc44664ee76df4a57fb6ba2d684102` |
| `public/images/projects/microservices-preview.svg` | untouched | `18c7a88329fb283dffd22a6c0ae304c196831855f4a183ec4207977e1284bf85` | `18c7a88329fb283dffd22a6c0ae304c196831855f4a183ec4207977e1284bf85` |
| `public/images/projects/mobilefleet-preview.svg` | untouched | `321693f83f5bd4f6769db688fd9b6f8037b17663af196d9492fb357f05977098` | `321693f83f5bd4f6769db688fd9b6f8037b17663af196d9492fb357f05977098` |
| `public/images/projects/ridesharing-preview.svg` | untouched | `be7edaac17194de322847e6b6ebcdf6f8187e13ed80c387993e7b2ad42f75b49` | `be7edaac17194de322847e6b6ebcdf6f8187e13ed80c387993e7b2ad42f75b49` |
| `public/images/projects/urbanbuild-preview.svg` | untouched | `e8c4caba51458702232a7a53ccda33c5192e3e7349f6a8d95fa5a3048d3afd3b` | `e8c4caba51458702232a7a53ccda33c5192e3e7349f6a8d95fa5a3048d3afd3b` |
| `public/images/sf-certified.png` | untouched | `f80ec9d5acd46c889d85604b487d228a395779317da67dbfcaca8f7d6dfa2cfa` | `f80ec9d5acd46c889d85604b487d228a395779317da67dbfcaca8f7d6dfa2cfa` |
| `public/images/shashank-portrait.jpg` | untouched | `b8577871a5422b71683ec362c1518e5ad7250be7523b6021ed358731f62b3dee` | `b8577871a5422b71683ec362c1518e5ad7250be7523b6021ed358731f62b3dee` |
| `public/images/shashank-profile.jpg` | untouched | `f251d352c33bbe23bcdf5e051a025ffa594143ce9e7f261a436206027f5f90dc` | `f251d352c33bbe23bcdf5e051a025ffa594143ce9e7f261a436206027f5f90dc` |
| `public/llms-full.txt` | untouched | `fc60105adc64de282e0a3dce59eed9b0983d56197c37533e3fbfc6023e2b91cb` | `fc60105adc64de282e0a3dce59eed9b0983d56197c37533e3fbfc6023e2b91cb` |
| `public/llms.txt` | untouched | `905dc3b479b6660a5a009d1838ecdcb334093fcba88a33813adde9dc6ef5d487` | `905dc3b479b6660a5a009d1838ecdcb334093fcba88a33813adde9dc6ef5d487` |
| `public/qa-doors/index.html` | modified | `0690cc7b726fa4a39900569ab5c93191b09e65dcd9f8167e34a638db453be0c9` | `c2a82745568186fc0c83c3a2eea2d81174eeebd87bb157d3fc54d8a59607a78b` |
| `public/robots.txt` | untouched | `c65ad9f7b55799625474e0bf6ba4b33c6b1cfd1e6fbae26d823185dd1ae60d50` | `c65ad9f7b55799625474e0bf6ba4b33c6b1cfd1e6fbae26d823185dd1ae60d50` |
| `public/site.webmanifest` | untouched | `4ed566026062b7e90af49acdda550180702676eac92db1909b0535c14adbc9b6` | `4ed566026062b7e90af49acdda550180702676eac92db1909b0535c14adbc9b6` |
| `public/sitemap.xml` | untouched | `9c5842ee6475c5be6f3410a864062415080295dedc3ec27ef13f76afe7e01264` | `9c5842ee6475c5be6f3410a864062415080295dedc3ec27ef13f76afe7e01264` |
| `scripts/check_descriptions.cjs` | untouched | `8eaa3ae616f87acdf2da517f5c002922eab199b2a917086bf99a8b8d3ef27258` | `8eaa3ae616f87acdf2da517f5c002922eab199b2a917086bf99a8b8d3ef27258` |
| `scripts/crawl_routes.mjs` | untouched | `c5391b7431d51fb99fa1a7fbaa8935f26dd39ab89abacb7bfd6666273a79ebe9` | `c5391b7431d51fb99fa1a7fbaa8935f26dd39ab89abacb7bfd6666273a79ebe9` |
| `scripts/run_full_qa.mjs` | untouched | `64b5fceb6a414856f7df5c876def7a076e9590c646492fe979519f1f25c24a1d` | `64b5fceb6a414856f7df5c876def7a076e9590c646492fe979519f1f25c24a1d` |
| `scripts/submit_indexnow.js` | untouched | `97cb7535d62e582db2666b308eceb86f701aa4e70ec4a9e610000d081ffaf583` | `97cb7535d62e582db2666b308eceb86f701aa4e70ec4a9e610000d081ffaf583` |
| `scripts/test_contact_form.mjs` | untouched | `16c82571ee0ff7f8206b6d83df7dffd2368e43f57304c7acf8d46cf08ff008a6` | `16c82571ee0ff7f8206b6d83df7dffd2368e43f57304c7acf8d46cf08ff008a6` |
| `scripts/test_seo.js` | untouched | `cff7ae530ccad215d1de26503aae95cc6f358d65ab9554b37a4aaae08413df8a` | `cff7ae530ccad215d1de26503aae95cc6f358d65ab9554b37a4aaae08413df8a` |
| `scripts/test_testing_lab.mjs` | untouched | `5d543fd13f85cce0b0a1a4c6cd03b9477218e15822387d2e67fd7639e6d765eb` | `5d543fd13f85cce0b0a1a4c6cd03b9477218e15822387d2e67fd7639e6d765eb` |
| `scripts/verify_built_html.js` | untouched | `7cc6c9d3e7f66be57afc33f94ddf153a4ed480dfabfed2b0d6029e7b8019b4ca` | `7cc6c9d3e7f66be57afc33f94ddf153a4ed480dfabfed2b0d6029e7b8019b4ca` |
| `server/api/helpers/admin-cookie.ts` | untouched | `8402545ee07b475148124e7c22f0e64644a495460133358caad89fd468e7cb19` | `8402545ee07b475148124e7c22f0e64644a495460133358caad89fd468e7cb19` |
| `server/api/helpers/api-response.ts` | untouched | `7da2d8dac64caf21955c6b0a5de07ef747904b9788ebce56735c25db781e5624` | `7da2d8dac64caf21955c6b0a5de07ef747904b9788ebce56735c25db781e5624` |
| `server/api/helpers/supabase.ts` | untouched | `e0380ad243e745f6f36312a62b9c5e1b9c6ffb831cf239c5964152bce25178a8` | `e0380ad243e745f6f36312a62b9c5e1b9c6ffb831cf239c5964152bce25178a8` |
| `server/api/schemas/enquiry-schema.ts` | untouched | `e843c97ea9f79831b5065e49d60ff2af3bac5f5bb0d5b55d6b8482e7206bbdf8` | `e843c97ea9f79831b5065e49d60ff2af3bac5f5bb0d5b55d6b8482e7206bbdf8` |
| `server/api/services/admin-auth.ts` | untouched | `bd9d4b43731823c93e181f31f4384ae129e638b1115c65964b0eda7b0aaf0e9a` | `bd9d4b43731823c93e181f31f4384ae129e638b1115c65964b0eda7b0aaf0e9a` |
| `server/api/services/enquiries.ts` | untouched | `2f454fbb68116c254bd67befbb0b1d46818031e6ab374ebc61596c77b49753f2` | `2f454fbb68116c254bd67befbb0b1d46818031e6ab374ebc61596c77b49753f2` |
| `server/api/services/enquiry-submission.ts` | untouched | `6cf628462b8e61884e219eb48a0af6e9916d03573fc76db5d7b9ff4d6e04803d` | `6cf628462b8e61884e219eb48a0af6e9916d03573fc76db5d7b9ff4d6e04803d` |
| `server/api/services/mailer.ts` | untouched | `92f6171ca34cfda22517ec6a7e1d92472fa49439209aa225ef984c7051b982cb` | `92f6171ca34cfda22517ec6a7e1d92472fa49439209aa225ef984c7051b982cb` |
| `server/api/services/whatsapp-client.ts` | untouched | `83367458be560737ba4c0e1d20ecfedb5a5ca19b68a3bbb68ac22edc208bc650` | `83367458be560737ba4c0e1d20ecfedb5a5ca19b68a3bbb68ac22edc208bc650` |
| `server/api/services/whatsapp-notification.ts` | untouched | `7d854df17cbf6aa8a704076fc4361e1121b42d6b40cf6096824e2e91d0944f32` | `7d854df17cbf6aa8a704076fc4361e1121b42d6b40cf6096824e2e91d0944f32` |
| `server/api/utils/utils.ts` | untouched | `c0adf27efbfa148d5abcf99e860f8e3e6c8fc77a1f99e023c08ef4f12e6ece29` | `c0adf27efbfa148d5abcf99e860f8e3e6c8fc77a1f99e023c08ef4f12e6ece29` |
| `supabase/migrations/20260905000000_enquiries.sql` | untouched | `174b7ec4aa52e5ec7fb3902c965e7063f6813298e821419a6cbfb3993b5b8429` | `174b7ec4aa52e5ec7fb3902c965e7063f6813298e821419a6cbfb3993b5b8429` |
| `supabase/migrations/20260905010000_secure_admin_enquiries.sql` | untouched | `a94510fb5f3b2e2f49c38f8d070c7da524d54971d463864c58e9b8b83d90700e` | `a94510fb5f3b2e2f49c38f8d070c7da524d54971d463864c58e9b8b83d90700e` |
| `supabase/migrations/20260906000000_admin_sessions.sql` | untouched | `498071b38b8989089f3d74a1be43709cb3708802f8709ccafe68b75a4bb61303` | `498071b38b8989089f3d74a1be43709cb3708802f8709ccafe68b75a4bb61303` |
| `supabase/migrations/20261010000000_enquiry_image.sql` | untouched | `e36d7bea5604e4ead3ff397b7486ba9d5b060ab1061c20d20162b6db3455d051` | `e36d7bea5604e4ead3ff397b7486ba9d5b060ab1061c20d20162b6db3455d051` |
| `tests/admin-flow.test.mjs` | untouched | `c13b95293f21beceeac0a8312d588b9de28c4946e2d3241e7ac1e4e9239abf5f` | `c13b95293f21beceeac0a8312d588b9de28c4946e2d3241e7ac1e4e9239abf5f` |
| `tests/api-regression.mjs` | untouched | `4cbf954438bbe5d9b4d7c5462613bc4b72458c315b18aeec373ff80a6fe3c89b` | `4cbf954438bbe5d9b4d7c5462613bc4b72458c315b18aeec373ff80a6fe3c89b` |
| `tests/browser-regression.py` | untouched | `75205d0babd8d62b9922c0f7b040fa8f127ee7f0cf819359142e0d4046aa5c75` | `75205d0babd8d62b9922c0f7b040fa8f127ee7f0cf819359142e0d4046aa5c75` |
| `tests/regression-live.mjs` | untouched | `0c3c766c235f66a3695d6efb0a989a7328d8b6b48131313b2cbaa5d6ef74f053` | `0c3c766c235f66a3695d6efb0a989a7328d8b6b48131313b2cbaa5d6ef74f053` |
| `tests/security-contract.test.mjs` | modified | `ccc20cc06bfa96358017724f52f7b6605519c05b75bb79af031271d2ee634bba` | `85c843d8547616f0ea4460e25c2c7172aeef867acb0bf39e31950df893b82eb4` |
| `tests/whatsapp-client.test.mjs` | untouched | `ee9380f3d71eb935622a2419d9c29ecff3051460885d2e4ad6bf6cd9134f690b` | `ee9380f3d71eb935622a2419d9c29ecff3051460885d2e4ad6bf6cd9134f690b` |
| `tsconfig.json` | modified | `4569f891ab134c66eec3891b93ca570c941cc94a5fb52041a11bc8a14d85006f` | `ea96ee32605353272c47b308f53cac32b8a34e7d10903d003f097af094968f4f` |
| `vercel.json` | untouched | `2f2347fba06f61ee44fc4e564b5cb3146c105123c82905e8c8037c4c24ab5087` | `2f2347fba06f61ee44fc4e564b5cb3146c105123c82905e8c8037c4c24ab5087` |
| `web/components/AbilityCard3D/AbilityCard3D.css` | untouched | `fb37ccfb409210db83ab7a8be6ec79a985b8971238df43bf00f16c2ee0e2510b` | `fb37ccfb409210db83ab7a8be6ec79a985b8971238df43bf00f16c2ee0e2510b` |
| `web/components/AbilityCard3D/AbilityCard3D.tsx` | modified | `2893fe9b86c687f5111031944e1d47a3e9ce13066249e459edc42d56a6b4c36a` | `17a639f4761cf340074e882e00446351d5f23d34afd9b30ec898db76d3007e6b` |
| `web/components/ActiveSectionProvider/ActiveSectionProvider.css` | untouched | `3d70ac348519d78ef7f77a7fd28d9e4dfb808a2882dbab70172e5d34cc3044f6` | `3d70ac348519d78ef7f77a7fd28d9e4dfb808a2882dbab70172e5d34cc3044f6` |
| `web/components/ActiveSectionProvider/ActiveSectionProvider.tsx` | untouched | `6afe33443089929509d3fef51727453c7b4265a9d7d65a7a4b88d61c0b1580d9` | `6afe33443089929509d3fef51727453c7b4265a9d7d65a7a4b88d61c0b1580d9` |
| `web/components/AmbientBackdrop/AmbientBackdrop.css` | untouched | `cbe976bdbeac446c63a6b3abc990bd509b17b45b965c8f0af918ddf0be579a62` | `cbe976bdbeac446c63a6b3abc990bd509b17b45b965c8f0af918ddf0be579a62` |
| `web/components/AmbientBackdrop/AmbientBackdrop.tsx` | untouched | `d244fbfbd9382f74b909d7b863fad6f2ea19b564a3631a8c5fa0571645d08692` | `d244fbfbd9382f74b909d7b863fad6f2ea19b564a3631a8c5fa0571645d08692` |
| `web/components/DefectCallout/DefectCallout.css` | untouched | `c5723003fc6178d9672337879f6ae69b8138b6f0c6fd1c1e328c7a3b50e9c829` | `c5723003fc6178d9672337879f6ae69b8138b6f0c6fd1c1e328c7a3b50e9c829` |
| `web/components/DefectCallout/DefectCallout.tsx` | untouched | `01422c90c8c18e12b8d0c9af4d12ee8dfe3019bdb31b36b61c4db115f5c26d78` | `01422c90c8c18e12b8d0c9af4d12ee8dfe3019bdb31b36b61c4db115f5c26d78` |
| `web/components/ExperienceTimeline/ExperienceTimeline.css` | untouched | `0daa9a7e4dd3a3bdf214b49cd7daf10bb246196670dedee07767ca814ae00c45` | `0daa9a7e4dd3a3bdf214b49cd7daf10bb246196670dedee07767ca814ae00c45` |
| `web/components/ExperienceTimeline/ExperienceTimeline.tsx` | modified | `c2c1901a4e83d79f32a716232673e019c44eb69c5aaae836ee5db3e043c55642` | `2de2ceb9fa9c66963a16b9df9b25202363d452f53b98c38f0792351ec542b3af` |
| `web/components/FlipCalendar/FlipCalendar.css` | untouched | `062a39566e6ee55e7c4b0581664d1ce2237e1eb198a1e17e1dfe58a50740fdee` | `062a39566e6ee55e7c4b0581664d1ce2237e1eb198a1e17e1dfe58a50740fdee` |
| `web/components/FlipCalendar/FlipCalendar.tsx` | modified | `278f106e48858a67b5e9148a7f991b0ff9de775464afa60e0a7c7f9ab5fcc45c` | `d6c44b6b7f09f479e5efb17058870987a6dc46325223dbdcd7bdda089a3352ed` |
| `web/components/FloatingDockNav/FloatingDockNav.css` | untouched | `082272d919fc35725594dca0bfd4a20a81cf00b4a139201cb63180a19bf2678a` | `082272d919fc35725594dca0bfd4a20a81cf00b4a139201cb63180a19bf2678a` |
| `web/components/FloatingDockNav/FloatingDockNav.tsx` | untouched | `a9263039c163c6ecd540602eddd78cb9430d218efee4fadbdc32cbc99c0fbb7b` | `a9263039c163c6ecd540602eddd78cb9430d218efee4fadbdc32cbc99c0fbb7b` |
| `web/components/ImageLightbox/ImageLightbox.css` | untouched | `5ed82b3c8e7077466fbf432ed71ee096075eef6c54c270ca26afd62b64dae657` | `5ed82b3c8e7077466fbf432ed71ee096075eef6c54c270ca26afd62b64dae657` |
| `web/components/ImageLightbox/ImageLightbox.tsx` | modified | `dec268bd3a0ce1c6fc0d8b86503e093d4aa5b5ed7e055599a91ca3c28f11ffa2` | `976dd8a1100d29d8406d189b92442c13d08af4dbd61130f82bf2bb6756893178` |
| `web/components/InteractiveTestRunner/InteractiveTestRunner.css` | untouched | `ffc34f0d61ef245f8c0bb0bd2b15e7c5bea2dc2433556514ab97a83722dea9a0` | `ffc34f0d61ef245f8c0bb0bd2b15e7c5bea2dc2433556514ab97a83722dea9a0` |
| `web/components/InteractiveTestRunner/InteractiveTestRunner.tsx` | untouched | `2efe234d62751786b22fda662c986d75f9785e2152a637b4d9cb48c1c70f54b6` | `2efe234d62751786b22fda662c986d75f9785e2152a637b4d9cb48c1c70f54b6` |
| `web/components/IntroLoader/IntroLoader.css` | untouched | `666c1d99538719f522e244b2380d1787e7d7a56dd483b9711a06d3b85ff2403b` | `666c1d99538719f522e244b2380d1787e7d7a56dd483b9711a06d3b85ff2403b` |
| `web/components/IntroLoader/IntroLoader.tsx` | modified | `62b6ff9202c2dd1fa04bbc43f86e941d2ae06aac8ee19242b07dd8d1db6fc147` | `2541bf8cd7a752a085586bcae83144dcae97b438f992264d0df859b7d4bb26c4` |
| `web/components/MultiStepContact/MultiStepContactOverlay.css` | untouched | `5c409d73cf3c418e6c14632157beb7825f26b6b70de1af99aff0a8467a442fc3` | `5c409d73cf3c418e6c14632157beb7825f26b6b70de1af99aff0a8467a442fc3` |
| `web/components/MultiStepContact/MultiStepContactOverlay.tsx` | modified | `09fda7d856a8ecefb2d340759a3658031998502a30ecc9f6351cea1a455a1e21` | `c53b9ce44b3697b915ba1febf3cd5f70bf575bb9d8b6235afc6fab833bc45eb7` |
| `web/components/ProjectHoverPreviewList/ProjectHoverPreviewList.css` | untouched | `039d61f48a7b7a79626852831fe9870077305d73b410771606d0c85219635554` | `039d61f48a7b7a79626852831fe9870077305d73b410771606d0c85219635554` |
| `web/components/ProjectHoverPreviewList/ProjectHoverPreviewList.tsx` | untouched | `fd3137b02efa465a599e93b16248fdeaad3103a2f3f881ffcaa34ada0f058a01` | `fd3137b02efa465a599e93b16248fdeaad3103a2f3f881ffcaa34ada0f058a01` |
| `web/components/ProjectLaptopShowcase/ProjectPreviews.css` | untouched | `fbb4279e75968505cf56e5bc50e8d75ba90edfaa59faefb865dc5e2e28486bb7` | `fbb4279e75968505cf56e5bc50e8d75ba90edfaa59faefb865dc5e2e28486bb7` |
| `web/components/ProjectLaptopShowcase/ProjectPreviews.tsx` | modified | `b56e1bdfdd98f55ab23745855539ceceb8149abb08f0341aa114167f12967dc8` | `3b7260a6d50596183114fb98424fe48f8ba037926045f263f5e1a60f9b53d084` |
| `web/components/QADoorsFrame/QADoorsFrame.css` | untouched | `a4dc6c795c8a418d61e0c2f37a7838d3c5dec2cae14a1f2b3669fddf38a2dd23` | `a4dc6c795c8a418d61e0c2f37a7838d3c5dec2cae14a1f2b3669fddf38a2dd23` |
| `web/components/QADoorsFrame/QADoorsFrame.tsx` | modified | `e48f68f052343e71a6e8535dae619f93937e0195bbb96784da6d15377c68643f` | `af85c60057eb5bba7af8205a696ef554eb8b3883209969135702c91c0f158f29` |
| `web/components/QADoorsFrame/index.ts` | untouched | `1cc89675eb1913c4193d74d7fd97eb6c345894d0ecd550a028b5957978c38c40` | `1cc89675eb1913c4193d74d7fd97eb6c345894d0ecd550a028b5957978c38c40` |
| `web/components/QALab/QALabCanvas.css` | untouched | `bb6cd7f9e6276ac7e61f685a272c0d6a52a03788ec765518117c4e5fbf2e1e74` | `bb6cd7f9e6276ac7e61f685a272c0d6a52a03788ec765518117c4e5fbf2e1e74` |
| `web/components/QALab/QALabCanvas.tsx` | modified | `37c04ee6308a18d382c65a34493b61c4ce7dc9da7ced74d7b1e0447dc2140641` | `65cd319e820e288eb7987c4d7dabec36f6d93fa2470b4bec14e1f288463504cb` |
| `web/components/QAWorkstation/QAWorkstation.css` | untouched | `aa21cff51a9fc76ee9928d6da965a7671bdb368d88319cd01d2a1aa0dcfd4fec` | `aa21cff51a9fc76ee9928d6da965a7671bdb368d88319cd01d2a1aa0dcfd4fec` |
| `web/components/QAWorkstation/QAWorkstation.tsx` | untouched | `bcf33e380bca5841bc82e958db5281c33de9016fe9dd1852fe042aefa843b6a7` | `bcf33e380bca5841bc82e958db5281c33de9016fe9dd1852fe042aefa843b6a7` |
| `web/components/SiteFooter/SiteFooter.css` | untouched | `b6712d7c8ab75fc9dbf39daa8f315c17f0d91587b31b725ee0a508cc1df8de48` | `b6712d7c8ab75fc9dbf39daa8f315c17f0d91587b31b725ee0a508cc1df8de48` |
| `web/components/SiteFooter/SiteFooter.tsx` | modified | `ffb48df91bc2d0431ce4f215031ae5e5093b300fa2ca8725094494dd6ebedd62` | `e483654f3701bc7470da4816035706ff5eac63f120f98a1351aacb5974375d89` |
| `web/components/SiteHeader/NavigationOverlay.css` | untouched | `042d35a8831b788396eb92a6844e418c4da57364b2c11c21d68e5f74b6113456` | `042d35a8831b788396eb92a6844e418c4da57364b2c11c21d68e5f74b6113456` |
| `web/components/SiteHeader/NavigationOverlay.tsx` | modified | `c0adf934d2c79b247822689dfb69d26c0f41998c2d58b353abfded221f1ed104` | `f75a85d652b815b97dd1c95f72bc0bb92d9808b90e0b8e70f2d1c1c6f1e53f2f` |
| `web/components/SiteHeader/SiteHeader.css` | untouched | `983008d8ccaaa0a04d2993e05b662070524e7b6987db05bc24be23266325890d` | `983008d8ccaaa0a04d2993e05b662070524e7b6987db05bc24be23266325890d` |
| `web/components/SiteHeader/SiteHeader.tsx` | modified | `d710fc96706734df22366e6a3c9bddc21a54eec99d1f9aebd2d86a980d755ad0` | `73f0c256f227eb7239157953fbf905e3d7f5a8fd07125dd63991abbb43c7f654` |
| `web/components/SkillDoorWall/SkillDoorWall.css` | untouched | `ad23a5e94960ec72f1f65287732d6cfcee1eaa57857df433676fefd7c2de7dd7` | `ad23a5e94960ec72f1f65287732d6cfcee1eaa57857df433676fefd7c2de7dd7` |
| `web/components/SkillDoorWall/SkillDoorWall.tsx` | untouched | `82a54d93e631cbc2ce6c4d6bffe546cb8b31aad674096789209733ed8780f3b1` | `82a54d93e631cbc2ce6c4d6bffe546cb8b31aad674096789209733ed8780f3b1` |
| `web/components/SmoothScroll/SmoothScroll.tsx` | modified | `7c488c3b5e069711eb045276196a84c690f60b563b31f594b5a538c25bad1fba` | `d27071f462b3d3cb87b18aea8e39959a64133efc787ade91396ba23b7c8f4918` |
| `web/components/SpecialtyLayout/SpecialtyLayout.css` | untouched | `eb46272b23715942e0dcfcfff08c4761d7f760f7ca3dc4f1d5dc6a6a78c6e39c` | `eb46272b23715942e0dcfcfff08c4761d7f760f7ca3dc4f1d5dc6a6a78c6e39c` |
| `web/components/SpecialtyLayout/SpecialtyLayout.tsx` | modified | `9ae3363a8445683148c17125f33b89b27cf9b081db944004c583484b6bfec5d9` | `3c8654f21ea65c924959619041375592b7d9def7d0641c6940aa8dddb7d9f28a` |
| `web/components/StatusBadge/StatusBadge.css` | untouched | `e1e4f4d19a8f4af45d1596ed8043bc537788e314ce3293aa24cf03e2701b625e` | `e1e4f4d19a8f4af45d1596ed8043bc537788e314ce3293aa24cf03e2701b625e` |
| `web/components/StatusBadge/StatusBadge.tsx` | untouched | `4b7ce070064144aa3d18e69354a06e5bbdc6e3159e6445cffcd4d438e0020bcc` | `4b7ce070064144aa3d18e69354a06e5bbdc6e3159e6445cffcd4d438e0020bcc` |
| `web/components/SubpageLayout/SubpageLayout.css` | untouched | `4a46cc71ced50e5763f54d2c8427208b5c32a697492954da1ee27fea6434312d` | `4a46cc71ced50e5763f54d2c8427208b5c32a697492954da1ee27fea6434312d` |
| `web/components/SubpageLayout/SubpageLayout.tsx` | untouched | `9f4ea4bb365a94f10a0fca72c5105b1fce8afcabc9f0d08bd54b8290d6fc4fb5` | `9f4ea4bb365a94f10a0fca72c5105b1fce8afcabc9f0d08bd54b8290d6fc4fb5` |
| `web/components/TestConsole/TestConsole.css` | untouched | `3b4c11a2a7e6f5c70b9320cdabfe5ae725b0aaa8e37526a4603ba00fc42d6430` | `3b4c11a2a7e6f5c70b9320cdabfe5ae725b0aaa8e37526a4603ba00fc42d6430` |
| `web/components/TestConsole/TestConsole.tsx` | untouched | `9738bdc1cd72761152a4cf45ae0131da3996632dfc9b8e9ce4d26f6b90ddb408` | `9738bdc1cd72761152a4cf45ae0131da3996632dfc9b8e9ce4d26f6b90ddb408` |
| `web/components/TiltCard/TiltCard.css` | untouched | `756f044da0d19d9f4b11fd91ec777a67df9a8c282c44b704fe5b2c0ce35929db` | `756f044da0d19d9f4b11fd91ec777a67df9a8c282c44b704fe5b2c0ce35929db` |
| `web/components/TiltCard/TiltCard.tsx` | untouched | `ba527f3b20517ea9847a3726917bda5f173d3c14f72a586c294ebb2d19bece73` | `ba527f3b20517ea9847a3726917bda5f173d3c14f72a586c294ebb2d19bece73` |
| `web/components/laptopshowcase/ProjectLaptopShowcase.css` | untouched | `0505d03b3a34740ef976c6cfeca56a2dce92f7a819215b09c09b22a749252de9` | `0505d03b3a34740ef976c6cfeca56a2dce92f7a819215b09c09b22a749252de9` |
| `web/components/laptopshowcase/ProjectLaptopShowcase.tsx` | modified | `a782eac29db78b9f432596a47d0b28bad6b8e69674195b342e031eb937ccaf81` | `d4fdd97edf4dae450c13648464b2e4521b12a237d6e739307ee133cdfa5aa430` |
| `web/data/portfolio-data.ts` | untouched | `e89595cb1c28608fe625a24682ba9930155e0013f9b92657c9abe36f8457f20f` | `e89595cb1c28608fe625a24682ba9930155e0013f9b92657c9abe36f8457f20f` |
| `web/hooks/useMotion.ts` | untouched | `b6b552ab7d35621f9a6629ad487541b2b583004a3086595f0f264cb50d2e767e` | `b6b552ab7d35621f9a6629ad487541b2b583004a3086595f0f264cb50d2e767e` |
| `web/hooks/useReducedMotion.ts` | untouched | `ae0cb0da04b2613f304dc64048cd072353be3050db596c2358e1f118515079ed` | `ae0cb0da04b2613f304dc64048cd072353be3050db596c2358e1f118515079ed` |
| `web/sections/About/About.css` | untouched | `0e32aa4340dd8276d1b6050ecd8e45a83bd56814e028a059a66485e771d9c038` | `0e32aa4340dd8276d1b6050ecd8e45a83bd56814e028a059a66485e771d9c038` |
| `web/sections/About/About.tsx` | untouched | `f0c191c5d3110ca2002a72ca2ae7544c63771300abd650dab9996cc14d914b60` | `f0c191c5d3110ca2002a72ca2ae7544c63771300abd650dab9996cc14d914b60` |
| `web/sections/BugSpotterLab/BugSpotterLab.css` | untouched | `5f908cd6d80b87d9f91ed5205c46e97a5d26e54b9acb70aafe8bc537f49ca724` | `5f908cd6d80b87d9f91ed5205c46e97a5d26e54b9acb70aafe8bc537f49ca724` |
| `web/sections/BugSpotterLab/BugSpotterLab.tsx` | untouched | `91b1f60b3f6a6d50f1717d0a5af74b073332bd36da801d36ce8cc12833af82e9` | `91b1f60b3f6a6d50f1717d0a5af74b073332bd36da801d36ce8cc12833af82e9` |
| `web/sections/Certifications/Certifications.css` | untouched | `ad598c6592958800aa3c164ceb55394765cfb32500e44710fe46ad2f9d0fffbf` | `ad598c6592958800aa3c164ceb55394765cfb32500e44710fe46ad2f9d0fffbf` |
| `web/sections/Certifications/Certifications.tsx` | untouched | `d7d863a5230cf4daf4d38b53a4054bbe4ea8e461eba0faa8d4f33fe742795f86` | `d7d863a5230cf4daf4d38b53a4054bbe4ea8e461eba0faa8d4f33fe742795f86` |
| `web/sections/ContactSection/Contact.tsx` | untouched | `1e94fa336e07e13f2fc819e71bf3f10ce1ef16484b8d6431b29cc74cd062ccaa` | `1e94fa336e07e13f2fc819e71bf3f10ce1ef16484b8d6431b29cc74cd062ccaa` |
| `web/sections/ContactSection/ContactSection.css` | untouched | `0b6e37aa8a007e57268b88b9d1df6cbe81c3c85111bd456554c07524a7a1b455` | `0b6e37aa8a007e57268b88b9d1df6cbe81c3c85111bd456554c07524a7a1b455` |
| `web/sections/ContactSection/ContactSection.tsx` | untouched | `4056063cdf31e00ce028645de931cce95d7535a44aa24cf5bf7b269ff59d5ac7` | `4056063cdf31e00ce028645de931cce95d7535a44aa24cf5bf7b269ff59d5ac7` |
| `web/sections/Experience/Experience.css` | untouched | `9e6e5cfed5ba164ccddb3cb427ebab569aa3d5d477d839303051767bb2e931f6` | `9e6e5cfed5ba164ccddb3cb427ebab569aa3d5d477d839303051767bb2e931f6` |
| `web/sections/Experience/Experience.tsx` | untouched | `c9b57123eec75b984fed10f8bbfb32c933b5d2f01cdbdbde777a92f24e3b5ac5` | `c9b57123eec75b984fed10f8bbfb32c933b5d2f01cdbdbde777a92f24e3b5ac5` |
| `web/sections/FAQ/FAQ.css` | untouched | `58c5d7bc72b1bf7b5de956ed7d46607b77741b7dc4d0dad8e7b7b55956d993ce` | `58c5d7bc72b1bf7b5de956ed7d46607b77741b7dc4d0dad8e7b7b55956d993ce` |
| `web/sections/FAQ/FAQ.tsx` | untouched | `e1088f4ef95643b728ee2ba6c997a8d6ac72e942d40ec21e1bac48ca17d4c3ed` | `e1088f4ef95643b728ee2ba6c997a8d6ac72e942d40ec21e1bac48ca17d4c3ed` |
| `web/sections/Footer/Footer.css` | untouched | `1b7416bd3a05275a11b4ac246cc1195ce88df0a895269cecbb139988036cd317` | `1b7416bd3a05275a11b4ac246cc1195ce88df0a895269cecbb139988036cd317` |
| `web/sections/Hero/Hero.css` | untouched | `3941314419b0eddb7e2300cb0bc505c6f32ae9f72ab3960a80225c8251ba7b87` | `3941314419b0eddb7e2300cb0bc505c6f32ae9f72ab3960a80225c8251ba7b87` |
| `web/sections/Hero/Hero.tsx` | untouched | `6518dfc0720ec63f59e9e287cc0456eda125e49a1eadcd0023817238f704e2d9` | `6518dfc0720ec63f59e9e287cc0456eda125e49a1eadcd0023817238f704e2d9` |
| `web/sections/Hero/HeroSection.css` | untouched | `ab0ecf897db4a3097c9347bbc035f00f16325e54472c6c8ab4b925c8b2336761` | `ab0ecf897db4a3097c9347bbc035f00f16325e54472c6c8ab4b925c8b2336761` |
| `web/sections/Hero/HeroSection.tsx` | modified | `43a9533f70a1cf855e072239acbca8aad0ca5d17087b68b43b1a89eda4b92f97` | `bc33b8aabcfa112ee73f8fa1f70a3848c23b854270383eb83b4661f5b87eaf1b` |
| `web/sections/Projects/Projects.css` | untouched | `fd059f7c7e52ffcd28d03ce9430cb3028bfca4185d50b4c37fe97f28d5280fa1` | `fd059f7c7e52ffcd28d03ce9430cb3028bfca4185d50b4c37fe97f28d5280fa1` |
| `web/sections/Projects/Projects.tsx` | untouched | `e03b974a52d143acc2667c295834f74ee5b273144e0bd8782ae824036d1d8f57` | `e03b974a52d143acc2667c295834f74ee5b273144e0bd8782ae824036d1d8f57` |
| `web/sections/Simulator/Simulator.css` | untouched | `f561fe7f724b71f5cf31fbc903a03c150481129db53820ad570e6730a84aa19d` | `f561fe7f724b71f5cf31fbc903a03c150481129db53820ad570e6730a84aa19d` |
| `web/sections/Simulator/Simulator.tsx` | untouched | `19c2d42abd41bca2db35e4aeae9aa886cbc52ec2eeba7181a738ef53f7f04cea` | `19c2d42abd41bca2db35e4aeae9aa886cbc52ec2eeba7181a738ef53f7f04cea` |
| `web/sections/Skills/Skills.css` | untouched | `eccd147c13b43da86308a9cfaec2cd87a3c251dbf9d27f0c35300301664624e9` | `eccd147c13b43da86308a9cfaec2cd87a3c251dbf9d27f0c35300301664624e9` |
| `web/sections/Skills/Skills.tsx` | untouched | `ed6dde3a2811200dca1f6575ef1de1817338609c7658cf3886efdaa6ba641607` | `ed6dde3a2811200dca1f6575ef1de1817338609c7658cf3886efdaa6ba641607` |
| `web/styles/animations.css` | untouched | `cd3f8c04f6d198cefc9fd75e0b3217212de2d86dec53bebeeeea0ef8e4c69929` | `cd3f8c04f6d198cefc9fd75e0b3217212de2d86dec53bebeeeea0ef8e4c69929` |
| `web/styles/base.css` | untouched | `78ffeafea0fe64dd52119e2dd1d9347c5fbf15d8aa46a58fe068deb54a347c67` | `78ffeafea0fe64dd52119e2dd1d9347c5fbf15d8aa46a58fe068deb54a347c67` |
| `web/styles/reference-overrides.css` | untouched | `f48d61be796dcc2f24ed0f5625e951d1db17defa23bf9721511bb0ca485130b6` | `f48d61be796dcc2f24ed0f5625e951d1db17defa23bf9721511bb0ca485130b6` |
| `web/styles/referenceoverride.css` | untouched | `d12a8bc35839956dc73ebe062cc1b467542cec75c2a64c9d6dfcb6f1a2f572d7` | `d12a8bc35839956dc73ebe062cc1b467542cec75c2a64c9d6dfcb6f1a2f572d7` |
| `web/styles/tokens.css` | modified | `7af3de16d76bb37a9ea523f532b2cb2184053af199391267310835a12cc40828` | `4533ba5c32ac5793f8b909a9fa3fa618f1767211787513c60e4e87c61e522890` |
| `web/utils/analytics.ts` | untouched | `5fe4a86788fc9083f3526fdeb4920fa910d296762fed004562d7257c7d162785` | `5fe4a86788fc9083f3526fdeb4920fa910d296762fed004562d7257c7d162785` |

## Added files

- `CHANGELOG.md`
- `PROJECT_STACK_AUDIT.md`
- `README.md`
- `REFERENCE_TEST_REPORT.md`
- `SOURCE_MANIFEST.md`
- `reference-audit.md`
- `tests/project-stack-regression.mjs`
- `tests/reference-interactions.mjs`
- `tests/reference-ui-regression.mjs`
- `web/components/ProjectPreviews/ProjectPreviews.css`
- `web/components/ProjectPreviews/ProjectPreviews.tsx`
- `web/components/ProjectStack/ProjectStack.css`
- `web/components/ProjectStack/ProjectStack.tsx`
- `web/components/ProjectStack/ProjectStackContext.ts`
- `web/components/SkipLink/SkipLink.tsx`
- `web/components/SpecialtyLayout/SpecialtyProjectShowcase.tsx`
- `web/hooks/useDialogFocus.ts`
- `web/styles/reference-fidelity.css`
- `web/utils/routes.ts`

Source snapshots, checksums and source diffs are included under `preservation/` in the ZIP. Generated dependencies/builds, audit output and private environment files remain excluded from the source hash table. The manifest excludes its own recursive hash.

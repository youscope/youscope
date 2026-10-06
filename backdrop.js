/* Design tokens
   Brand identity mirrors the YouScope app icon: a dark-red "Y", a grey "S".
   Two themes; light is the default, dark is applied via [data-theme="dark"].
   A no-flash inline script in <head> sets the attribute before first paint. */

:root {
  --brand-red:        #c10000;   /* the "Y": brand red, on light */
  --brand-red-strong: #9a0000;
  --brand-grey:       #585858;   /* the "S": brand grey, on light */

  /* Surfaces & text: light */
  --bg:        #ffffff;
  --bg-tint:   #fbfbfc;
  --surface:   #f6f7f9;
  --surface-2: #eef1f4;
  --border:    #e2e6eb;
  --border-2:  #d6dbe1;
  --text:      #14181e;
  --text-2:    #3c434d;
  --muted:     #5a626d;
  --accent:        var(--brand-red);
  --accent-strong: var(--brand-red-strong);
  --accent-ink:    #ffffff;       /* text on an accent fill */
  --grid-line: rgba(20, 24, 30, .06);
  --grid-dot:  rgba(193, 0, 0, .16);
  --scan:      rgba(193, 0, 0, .09);
  --shadow:    0 1px 2px rgba(16,20,26,.06), 0 8px 24px rgba(16,20,26,.06);
  --shadow-lg: 0 2px 4px rgba(16,20,26,.06), 0 20px 48px rgba(16,20,26,.12);

  /* Type */
  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-body: "IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;

  /* Fluid type scale */
  --step--1: clamp(.82rem, .80rem + .10vw, .90rem);
  --step-0:  clamp(1rem, .96rem + .18vw, 1.12rem);
  --step-1:  clamp(1.20rem, 1.10rem + .45vw, 1.55rem);
  --step-2:  clamp(1.55rem, 1.30rem + 1.1vw, 2.30rem);
  --step-3:  clamp(2.20rem, 1.60rem + 2.7vw, 4.20rem);
  --step-4:  clamp(2.80rem, 1.80rem + 4.6vw, 6.00rem);

  /* Space & shape */
  --sp-1: .5rem;  --sp-2: .875rem; --sp-3: 1.25rem;
  --sp-4: 2rem;   --sp-5: 3rem;    --sp-6: 4.5rem;   --sp-7: 7rem;
  --radius: 14px;
  --radius-sm: 9px;
  --maxw: 1180px;
}

[data-theme="dark"] {
  --brand-red:        #f24a44;   /* brand red lifted for contrast on dark */
  --brand-red-strong: #ff6a63;
  --brand-grey:       #a2acb8;

  --bg:        #0d1014;
  --bg-tint:   #0f1319;
  --surface:   #14181e;
  --surface-2: #1b212a;
  --border:    #262d38;
  --border-2:  #313a47;
  --text:      #e9edf2;
  --text-2:    #c3cad4;
  --muted:     #99a3b1;
  --accent:        var(--brand-red);
  --accent-strong: #ff6a63;
  --accent-ink:    #14181e;
  --grid-line: rgba(233, 237, 242, .05);
  --grid-dot:  rgba(242, 74, 68, .30);
  --scan:      rgba(242, 74, 68, .12);
  --shadow:    0 1px 2px rgba(0,0,0,.4), 0 10px 30px rgba(0,0,0,.35);
  --shadow-lg: 0 2px 6px rgba(0,0,0,.5), 0 24px 60px rgba(0,0,0,.5);
}

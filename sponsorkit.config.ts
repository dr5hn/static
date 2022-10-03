import { defineConfig, presets } from 'sponsorkit'

const SAMPLE_LOGO = (width: number, y: number) => `
<a xlink:href="https://example.com" class="sponsorkit-link" target="_blank" id="Sample">
<svg></svg>
</a>
`

export default defineConfig({
  tiers: [
    {
      title: 'Backers',
      preset: presets.small,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: {
        avatar: {
          size: 42,
        },
        boxWidth: 52,
        boxHeight: 52,
        container: {
          sidePadding: 30,
        },
      }
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 50,
      preset: presets.medium,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 100,
      preset: presets.large,
    },
    {
      title: 'Platinum Sponsors',
      monthlyDollars: 500,
      preset: presets.xl,
    },
    // {
    //   title: 'Special Sponsor',
    //   monthlyDollars: Infinity,
    //   composeAfter(compose, _, config) {
    //     if (config.filter?.({ monthlyDollars: Infinity } as any) !== false) {
    //       compose
    //         .addSpan(20)
    //         .addText('Special Sponsor', 'sponsorkit-tier-title')
    //         .addSpan(10)
    //         //.addRaw(SAMPLE_LOGO(config.width!, compose.height))
    //         .addSpan(130)
    //     }
    //   }
    // },
  ]
})

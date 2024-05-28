import { BadgePreset, defineConfig, presets } from 'sponsorkit'
import fs from 'fs/promises'

const SAMPLE_LOGO = (width: number, y: number) => `
<a xlink:href="https://example.com" class="sponsorkit-link" target="_blank" id="Sample">
<svg></svg>
</a>
`

const past: BadgePreset = {
  avatar: {
    size: 20,
  },
  boxWidth: 22,
  boxHeight: 22,
  container: {
    sidePadding: 35,
  },
}

export default defineConfig({
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: past,
    },
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
  ],

  async onSponsorsReady(sponsors) {
    await fs.writeFile(
      'sponsors.json',
      JSON.stringify(
        sponsors
          .filter((i) => i.privacyLevel !== 'PRIVATE')
          .map((i) => {
            return {
              name: i.sponsor.name,
              login: i.sponsor.login,
              avatar: i.sponsor.avatarUrl,
              amount: i.monthlyDollars,
              link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
              org: i.sponsor.type === 'Organization'
            }
          })
          .sort((a, b) => b.amount - a.amount),
        null,
        2
      )
    )
  },

  outputDir: '.',
  formats: ['svg', 'png'],

  renders: [
    {
      name: 'sponsors',
      width: 800,
      // filter: sponsor => sponsor.sponsor?.login !== 'nuxtlabs',
    },
    {
      name: 'sponsors.wide',
      width: 1800,
      // filter: sponsor => sponsor.sponsor?.login !== 'nuxtlabs',
    },
    {
      name: 'sponsors.part1',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars >= 9.9
    },
    {
      name: 'sponsors.part2',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 9.9 && sponsor.monthlyDollars >= 0
    },
    {
      name: 'sponsors.past',
      width: 800,
      filter: (sponsor) => sponsor.monthlyDollars < 0
    },
    {
      name: 'sponsors.circles',
      width: 1000,
      includePastSponsors: true,
      renderer: 'circles',
      circles: {
        radiusPast: 3
      }
    }
  ]
})

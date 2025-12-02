/** Fields you’ll want now (and map nicely to CMS later):
 * slug – "tree-fiddy" (what [slug] uses)
 * name – "Dlitespeed"
 * priceCents – 10000
 * status – 'available' | 'sold' | 'coming_soon'
 * imageUrl – main card image
 * heroImageUrl (optiongal, for the big detail header) * Optional *
 * descriptionShort – for the card * Optional *
 * descriptionIntro – first paragraphs for the detail page body * Optional *
 * descriptionBullets – bulleted feature list * Optional *
 * descriptionOutro – closing paragraph(s) * Optional *
 * tags – ['Overdrive', 'One-off'] * Optional *
 * productLine - 'Tarot', 'Handwired', 'Limited', 'Custom' etc * Optional *
 * maybe createdAt / order for sorting
 **/

import { Pedal } from '@/modules/pedals/types';

export const pedals: Pedal[] = [
  {
    slug: 'tree-fiddy',
    name: 'Brown Bear Tree Fiddy',
    priceCents: 17500,
    status: 'available',
    imageUrl: '/tree-fiddy.png',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on the DOD250',
    descriptionIntro:
      'The Brown Bear Tree Fiddy Overdrive Pedal is a legendary classic that ' +
      'delivers the rich, warm overdrive tones sought after by guitarists of all genres. ' +
      'Based on the DOD 250, it is known for its smooth, natural overdrive and dynamic response. ' +
      'Whether you are after subtle tonal warmth or a more saturated, driven sound, ' +
      'this pedal adapts easily to your playing style.\n\n' +
      'Featuring simple yet effective controls—Level, Tone, and Drive—the Tree Fiddy offers ' +
      'versatile tone-shaping possibilities. The Level knob adjusts the output volume, ' +
      'the Tone control fine-tunes the balance between bright and mellow frequencies, ' +
      'and the Drive knob lets you dial in everything from a slight edge to full-throttle crunch.',
    descriptionBullets: [
      'Classic overdrive sound with smooth, natural distortion',
      'Simple, user-friendly controls: Level, Tone, and Drive',
      'Versatile tonal range from subtle warmth to intense overdrive',
      'Sturdy, road-ready construction',
      'Great for styles from bluesy smoothness to classic rock grit'
    ],
    descriptionOutro:
      'With its rugged construction and intuitive layout, the Tree Fiddy is ready for the stage or studio. ' +
      'Bring the iconic sound of the Tree Fiddy into your rig and experience it for yourself.',
    tags: ['Overdrive', 'One-off'],
    type: 'Overdrive',
    stripePriceId: process.env.STRIPE_PRICE_ID_TREE_FIDDY,
    productLine: 'Limited'
  },
  {
    slug: 'son-of-a-b',
    name: 'Son of a B!',
    priceCents: 10000,
    status: 'available',
    imageUrl: '/sob-2.jpg',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on the Benson Preamp',
    descriptionIntro:
      'Use the Son of a B! in front of an overdrive or distortion pedal to open up another range of sonic possibilities. ' +
      'It can push an already driven amp or pedal into a sweeter, more complex breakup, or act as a standalone preamp for harmonically rich tones.\n\n' +
      'The Son of a B! is known for its warm, dynamic, and versatile sound. It offers a rich overdrive with a touch of natural compression, ' +
      'making it great for adding character and sustain to your tone. The EQ controls are designed to be musical and responsive, ' +
      'so you can shape your sound with precision whether you are chasing chime, mid-forward punch, or darker vintage voicings.',
    descriptionBullets: [
      'Warm, dynamic preamp-style overdrive tone',
      'Natural compression that adds character and sustain',
      'Musical, responsive EQ for precise tone shaping',
      'Works great as a main drive, boost, or always-on tone sweetener',
      'Versatile enough for blues, rock, jazz, and beyond'
    ],
    descriptionOutro:
      'If you are looking for a preamp-style pedal that can live at the heart of your rig, the Son of a B! delivers. ' +
      'From subtle grit to rich driven textures, it rewards touch and dynamics while keeping your playing front and center.',
    tags: ['Overdrive', 'Tarot'],
    type: 'Overdrive',
    productLine: 'Tarot',
    stripePriceId: process.env.STRIPE_PRICE_ID_SOB
  },
  {
    slug: 'super-dolt',
    name: 'Super Dolt',
    priceCents: 10000,
    status: 'available',
    imageUrl: '/super-dolt.png',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on JHS SuperBolt',
    descriptionIntro:
      'The Brown Bear Effects Super Dolt is designed to capture the feel of a classic British-style amplifier, ' +
      'inspired by vintage 60s amps known for their iconic overdrive and punchy midrange. It gives you that cranked small-amp vibe, ' +
      'even at more manageable volumes.\n\n' +
      'From edge-of-breakup chime to gritty, pushed-amp crunch, the Super Dolt responds to your picking dynamics and guitar volume, ' +
      'making it easy to go from cleanish to snarling without changing any settings.',
    descriptionBullets: [
      'Amp-inspired overdrive based on a vintage 60s British-style circuit',
      'Touch-sensitive response that cleans up with your guitar’s volume knob',
      'Range of tones from edge-of-breakup to full, crunchy drive',
      'Works well as a main overdrive or stacked with other pedals',
      'Perfect for classic rock, indie, and rootsy overdriven tones'
    ],
    descriptionOutro:
      'If you love the sound of a small vintage amp pushed hard, the Super Dolt puts that character right at your feet. ' +
      'Drop it onto your board, dial it in, and enjoy that expressive, amp-like drive wherever you play.',
    tags: ['Overdrive', 'Tarot'],
    type: 'Overdrive',
    productLine: 'Tarot',
    stripePriceId: process.env.STRIPE_PRICE_ID_SUPER_DOLT
  },
  {
    slug: 'large-marge',
    name: 'Large Marge',
    priceCents: 19500,
    status: 'available',
    imageUrl: '/large-marge.png',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on Lovetone Big Cheese',
    descriptionIntro:
      'The Large Marge Fuzz is Brown Bear’s adaptation of the classic Lovetone Big Cheese, ' +
      'a famously flexible fuzz first released in 1995. The original circuit has earned a cult ' +
      'following thanks to an artist list that includes players like Jimmy Page, ' +
      'Johnny Marr, J Mascis, and Jeff Tweedy.\n\n' +
      'At its core, the design combines several classic ideas into one box. An op-amp handles ' +
      'input buffering and output level recovery, while a silicon transistor fuzz—reminiscent ' +
      'of vintage Fuzz Face and Tone Bender circuits—sits in the middle of the chain. ' +
      'After that, diode hard clipping and a Big Muff–style tone section shape the final voice, ' +
      'giving the Large Marge a huge range of textures from smooth sustain to jagged, snarling fuzz.',
    descriptionBullets: [
      'Inspired by the 1995 Lovetone Big Cheese silicon fuzz',
      'Hybrid topology with op-amp buffering, silicon fuzz core, and diode hard clipping',
      'Big Muff–style tone control for powerful EQ shaping',
      'Four-position rotary with tone bypass, scooped mids, and flat mids options',
      '“Cheese” mode misbiases the fuzz for gated, dying-amp style tones',
      'Optional final boost stage for increased maximum output level',
      'Capable of everything from classic fuzz roar to experimental, glitchy textures'
    ],
    descriptionOutro:
      'Large Marge keeps the spirit of the original Big Cheese intact while adding a little extra ' +
      'headroom on tap. By reconfiguring the output buffer as a dedicated boost, it can push ' +
      'your amp harder when you need it, without losing the character that made the circuit ' +
      'legendary in the first place. Whether you are chasing iconic shoegaze walls of sound, ' +
      'chunky rhythm fuzz, or unpredictable gated chaos, the Large Marge is built to be the ' +
      'centerpiece of your fuzz arsenal.',

    tags: ['Fuzz', 'Tarot'],
    type: 'Fuzz',
    productLine: 'Tarot',
    stripePriceId: process.env.STRIPE_PRICE_ID_LARGE_MARGE
  }
];

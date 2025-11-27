/** Fields you’ll want now (and map nicely to CMS later):
 * slug – "dlitespeed" (what [slug] uses
 * name – "Dlitespeed"
 * priceCents – 10000
 * status – 'available' | 'sold' | 'coming_soon'
 * imageUrl – main card image
 * heroImageUrl (optional, for the big detail header) * Optional *
 * descriptionShort – for the card * Optional *
 * descriptionLong – for the detail page body * Optional *
 * tags – ['Overdrive', 'One-off'] * Optional *
 * series - 'Tarot', 'Handwired', 'Limited', 'Custom' etc * Optional *
 ** maybe createdAt / order for sorting
 **/

import { Pedal } from '@/modules/pedals/types';

export const pedals: Pedal[] = [
  {
    slug: 'tree-fiddy',
    name: 'Brown Bear Tree Fiddy',
    priceCents: 10000,
    status: 'available',
    imageUrl: '/tree-fiddy.png',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Clone of DOD250',
    descriptionLong: `The Brown Bear Tree fiddy Overdrive Pedal is a legendary classic that delivers the rich, warm overdrive tones sought after by guitarists of all genres. Based on the DOD 250, renowned for its smooth, natural overdrive and dynamic response. Whether you're after subtle tonal warmth or a more saturated, driven sound, this pedal adapts to your playing style with ease.
    Featuring simple yet effective controls—Level, Tone, and Drive—the Tree Fiddy offers versatile tone-shaping possibilities. The Level knob adjusts the output volume, while the Tone control fine-tunes the balance between bright and mellow frequencies. The Drive knob allows for precise distortion control, giving you everything from a slight edge to full-throttle crunch.
    With its rugged, reliable construction and intuitive design, the Tree Fiddyis ideal for players looking for a pedal that can handle everything from bluesy smoothness to classic rock grit. Whether you're on stage or in the studio, this overdrive pedal brings a timeless tone that’s perfect for enhancing your sound or cutting through the mix.
    **Key Features:**
    - Classic overdrive sound with smooth, natural distortion
    - Simple, user-friendly controls: Level, Tone, and Drive
    - Versatile tonal range from subtle warmth to intense overdrive
    - Sturdy, road-ready construction
    - Perfect for a variety of playing styles, from blues to rock
    Bring the iconic sound of the Tree Fiddy into your rig and experience it&nbsp;for yourself.&nbsp;`,
    tags: ['Overdrive', 'One-off'],
    type: 'Overdrive'
  },
  {
    slug: 'son-of-a-b',
    name: 'Son of a B!',
    priceCents: 10000,
    status: 'available',
    imageUrl: '/sob-2.jpg',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on the Benson Preamp',
    descriptionLong: `Use it in front of an overdrive or distortion pedal to open up another range of sonic possibilities.&nbsp;
    The Son of a B pedal is known for it's warm, dynamic, and versatile sound. They typically offer a rich overdrive with a touch of natural compression, which makes them great for adding character and sustain to your tone. The EQ controls are designed to be musical and responsive, allowing you to shape your sound with precision. The overall vibe is usually vintage-inspired, offering a blend of clarity and warmth that works well for a range of styles from blues and rock to jazz.`,
    tags: ['Overdrive', 'Tarot'],
    type: 'Fuzz',
    productLine: 'Tarot'
  },
  {
    slug: 'super-dolt',
    name: 'Super Dolt',
    priceCents: 10000,
    status: 'available',
    imageUrl: '/super-dolt.png',
    heroImageUrl: '/ProductTestImage.png',
    descriptionShort: 'Based on JHS SuperBolt',
    descriptionLong: `&nbsp;The Brown Bear Effects Super Dolt is a guitar pedal designed to emulate the sound of a classic British-style amplifier, specifically a vintage 60s amp known for its iconic overdrive and crunch`,
    tags: ['Overdrive', 'Tarot'],
    type: 'Overdrive',
    productLine: 'Tarot'
  }
];

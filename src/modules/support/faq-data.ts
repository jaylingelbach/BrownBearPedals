export type FaqSectionId =
  | 'general'
  | 'warranty'
  | 'returns'
  | 'shipping'
  | 'payments';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSection {
  id: FaqSectionId;
  title: string;
  description?: string;
  items: FaqItem[];
}

// 🔧 Sample data – replace / extend as you like
export const faqSections: FaqSection[] = [
  {
    id: 'general',
    title: 'General FAQs',
    description:
      'Questions about Brown Bear Pedals, how they work, or general info about the brand.',
    items: [
      {
        id: 'what-is-brown-bear',
        question: 'What is Brown Bear Pedals?',
        answer:
          'Brown Bear Pedals is a small-batch effects company building tarot-inspired and vintage-influenced guitar pedals by hand in the USA.'
      },
      {
        id: 'power-supply',
        question: 'What type of power supply do your pedals require?',
        answer:
          'Unless otherwise noted on the product page or on the pedal enclosure, our pedals use a standard 9V DC center-negative power supply.\n\nWe do not recommend using daisy-chained supplies that are noisy or unregulated. We recommend any high-quality supply that utilizes isolated power. This would include the Voodoo Lab PP2+ or the IS0-5 and several other brands/models.\n\nONLY purchase and use power supplies made specifically for guitar pedals.'
      }
    ]
  },
  {
    id: 'warranty',
    title: 'Warranty & Repair',
    description:
      'Coverage details and what to do if something goes wrong with your pedal.',
    items: [
      {
        id: 'warranty-length',
        question: 'Do Brown Bear Pedals come with a warranty?',
        answer:
          'Yes. Brown Bear Pedals are backed by a limited warranty against defects in materials and workmanship. Please see the Support page for full details and to register your pedal for coverage.'
      },
      {
        id: 'repairs',
        question: 'What do I do if I need a repair?',
        answer:
          'If your pedal is acting up, reach out via the Contact page with your order info, serial number (if applicable), and a description of the issue. We will walk you through troubleshooting and, if needed, next steps for repair.'
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    items: [
      {
        id: 'accept-returns',
        question: 'Do you accept returns?',
        answer:
          'We want you to be happy with your gear. If you purchased directly from Brown Bear Pedals, please contact us within 14 days from delivery and we’ll discuss return or exchange options, subject to condition of the pedal. Check out our support page for more details.'
      },
      {
        id: 'return-label',
        question: 'Do you provide free return labels?',
        answer:
          'No, the customer will be responsible for return shipping and assumes all liability for lost or damaged shipments. We suggest using an insured and traceable shipment method, with delivery confirmation and signature required.'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    items: [
      {
        id: 'ship-time',
        question: 'How long does it take for orders to ship?',
        answer:
          'Most in-stock pedals ship within a few business days. Custom and pre-order builds will ship based on the lead times listed on the product page.'
      },
      {
        id: 'international',
        question: 'Do you ship internationally?',
        answer:
          'International shipping options may be available depending on your region. Duties, taxes, and import fees are the responsibility of the customer.'
      },
      {
        id: 'shipping-duties',
        question: 'Who pays international duties and taxes?',
        answer: `All duties and taxes are the responsibility of the customer. We will not pay the cost of duties and taxes for your nation. If duties and taxes are refused and the package is returned to Brown Bear Pedals, we will issue a refund less the fees associated with the returned shipment.`
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Safety',
    items: [
      {
        id: 'payment-safety',
        question: 'Is my payment data safe with you?',
        answer:
          'All payments are processed through trusted third-party providers. Brown Bear Pedals does not store full credit card numbers on our servers.'
      },
      {
        id: 'forms-of-payment',
        question: 'What types of payment do you accept?',
        answer:
          'We accept payments from major credit card companies like Visa, Mastercard, and American Express.'
      }
    ]
  }
];

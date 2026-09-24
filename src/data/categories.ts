export interface CategoryItem {
  title: string;
  href: string;
  badge?: string;
  subCategories?: {
    title: string;
    href: string;
    items?: { title: string; href: string }[];
  }[];
}

export const NAVIGATION_DATA: CategoryItem[] = [
  {
    title: 'New',
    href: '/collections/new-arrivals',
    badge: 'Hot'
  },
  {
    title: 'TYOHAR Sale',
    href: '/collections/sos-sale',
    badge: 'Sale',
    subCategories: [
      {
        title: 'Shop By Price',
        href: '/collections/sos-sale',
        items: [
          { title: 'Under ₹999', href: '/collections/sos-sale?price=under-999' },
          { title: 'Under ₹1999', href: '/collections/sos-sale?price=under-1999' },
          { title: 'Under ₹2999', href: '/collections/sos-sale?price=under-2999' },
          { title: 'Under ₹4999', href: '/collections/sos-sale?price=under-4999' }
        ]
      },
      {
        title: 'Special Offers',
        href: '/collections/sos-sale',
        items: [
          { title: 'Flat 50% Off', href: '/collections/sos-sale?discount=50' },
          { title: 'Flat 60% Off', href: '/collections/sos-sale?discount=60' },
          { title: 'Ready to Ship Fast', href: '/collections/ready-to-ship' }
        ]
      }
    ]
  },
  {
    title: 'Bestsellers',
    href: '/collections/bestseller-100-days'
  },
  {
    title: 'Womenswear',
    href: '/collections/womens-wear',
    subCategories: [
      {
        title: 'Ethnic Wear',
        href: '/collections/ethnic-wear',
        items: [
          { title: 'Suit Sets', href: '/collections/suit-sets' },
          { title: 'Kurta Sets', href: '/collections/kurta-set' },
          { title: 'Coord Sets', href: '/collections/ethnic-coord-set' },
          { title: 'Sharara Sets', href: '/collections/sharara' },
          { title: 'Lehenga Sets', href: '/collections/lehenga-set' },
          { title: 'Sarees', href: '/collections/saree' },
          { title: 'Blouse', href: '/collections/blouse' }
        ]
      },
      {
        title: 'Western Wear',
        href: '/collections/western-wear',
        items: [
          { title: 'Dresses', href: '/collections/dresses' },
          { title: 'Coord Sets', href: '/collections/coord-set' },
          { title: 'Top & Shirts', href: '/collections/top-shirts' }
        ]
      },
      {
        title: 'Bottom Wear',
        href: '/collections/bottom-wear',
        items: [
          { title: 'Cotton Pants', href: '/collections/cotton-pants' },
          { title: 'Linen Pants', href: '/collections/linen-pants' }
        ]
      },
      {
        title: 'Winterwear',
        href: '/collections/winterwear',
        items: [
          { title: 'Suzani Jackets', href: '/collections/suzani-jackets' },
          { title: 'Velvet Suits', href: '/collections/velvet-suits' },
          { title: 'Shawls', href: '/collections/shawls' }
        ]
      }
    ]
  },
  {
    title: 'Footwear',
    href: '/collections/footwear',
    subCategories: [
      {
        title: 'Categories',
        href: '/collections/footwear',
        items: [
          { title: 'Kolhapuris', href: '/collections/kolhapuri' },
          { title: 'Juttis', href: '/collections/juttis' },
          { title: 'Flats', href: '/collections/casual-flats' },
          { title: 'Heels', href: '/collections/heels' },
          { title: 'Mules', href: '/collections/mules' },
          { title: 'Loafers', href: '/collections/loafers' }
        ]
      }
    ]
  },
  {
    title: 'Bags',
    href: '/collections/bags',
    subCategories: [
      {
        title: 'Styles',
        href: '/collections/bags',
        items: [
          { title: 'Potlis', href: '/collections/potlis' },
          { title: 'Sling Bags', href: '/collections/sling-bags' },
          { title: 'Tote Bags', href: '/collections/tote-bags' },
          { title: 'Satchel Bags', href: '/collections/satchel-bags' },
          { title: 'Laptop Sleeves', href: '/collections/laptop-sleeves' }
        ]
      }
    ]
  },
  {
    title: 'Jewellery',
    href: '/collections/jewellery',
    subCategories: [
      {
        title: 'Ornaments',
        href: '/collections/jewellery',
        items: [
          { title: 'Earrings', href: '/collections/earrings' },
          { title: 'Necklace', href: '/collections/necklace' },
          { title: 'Bangles', href: '/collections/bangles' },
          { title: 'Anklets', href: '/collections/anklets' },
          { title: 'Maang Tikka Set', href: '/collections/maang-tikka' }
        ]
      }
    ]
  },
  {
    title: 'Ready to Ship',
    href: '/collections/ready-to-ship'
  }
];

export const STORY_CIRCLES = [
  {
    id: '1',
    title: 'TYOHAR Sale',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_a1af71eb-dc61-4eca-8a80-238607d0b5dd.jpg?v=1768904282',
    href: '/collections/sos-sale',
    isSale: true
  },
  {
    id: '2',
    title: 'Suit Sets',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_4f82314f-c3c9-43c5-88cf-f72efa475255.jpg?v=1768903808',
    href: '/collections/suit-sets'
  },
  {
    id: '3',
    title: 'Lehenga Sets',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_7258e590-b662-4a57-a602-f8ca515ef7ef.jpg?v=1768911739',
    href: '/collections/lehenga-set'
  },
  {
    id: '4',
    title: 'Kurta Sets',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_5effcf27-c009-490b-ae7f-34762ec7a0db.jpg?v=1777124314',
    href: '/collections/kurta-set'
  },
  {
    id: '5',
    title: 'Bestsellers',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_536dd661-88d0-474b-a4bc-da349815b90d.jpg?v=1777124376',
    href: '/collections/bestseller-100-days'
  },
  {
    id: '6',
    title: 'Under 4999',
    image: 'https://cdn.shopify.com/s/files/1/2542/7564/files/1_d0742484-1fec-43ee-8c1e-33f5fad89f8b.jpg?v=1768914389',
    href: '/collections/sos-sale?price=under-4999'
  }
];

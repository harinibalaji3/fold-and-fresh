/* Fold & Fresh Laundry Co. - all store content lives here so you can edit it in one place.
   Images are Unsplash URLs. If one ever breaks, the site swaps in a placeholder automatically. */
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const IMG = {
  hero: '1489274495757-95c7c837b101', wash: '1582735689369-4fe89db7114c', iron: '1635274605638-d44babc08a4f',
  dry: '1548768041-2fceab4c0b85', stain: '1630329273801-8f629dba0a72', premium: '1760013531865-89ff324f83a6',
  shoe: '1600185365483-26d7a4cc7519', blanket: '1542728929-2b5d9a0c8d48', woollen: '1457545195570-67f207084966', linen: '1699797467199-6bdf301649e8', bags: '1604335398980-4de1a4ea6b34',
  van: '1601362840469-51e4d8d58785', team1: '1507003211169-0a1dd7228f2d', team2: '1494790108377-be9c29b29330',
  team3: '1500648767791-00dcc994a43e', team4: '1438761681033-6461ffad8d80', blog1: '1567113463300-102a7eb3cb26',
  blog2: '1523212727988-82c430c79c8e', blog3: '1692576855758-318a1fa8ff6d', blog4: '1619032468883-89a84f565cba',
  blog5: '1596755094514-f87e34085b2c', blog6: '1517677208171-0bc6725a3e60', biz: '1521791136064-7986c2920216'
};
/* Photos used ONLY by the Home 1 "Just added" slider (service id -> Unsplash photo id), so they differ from the Services page and the blog */
const HOME_IMG = {
  'wash-fold': '1696546761269-a8f9d2b80512',
  'ironing': '1604176354204-9268737828e4',
  'linen-cleaning': '1582735689283-7b70dbe630ea',
  'dry-cleaning': '1586284359445-2e1d8db7f4cd',
  'premium-care': '1617157458504-d053be085fa5'
};
const CATS = { everyday: 'Everyday care', dryclean: 'Dry cleaning', specialty: 'Specialty care' };
const UNIT_LABEL = { kg: 'per kg', item: 'per item', pair: 'per pair', piece: 'per piece' };

const SERVICES = [
  { id: 'wash-fold', cat: 'everyday', name: 'Regular Wash & Fold', unit: 'kg', price: 3.5, turnaround: '24 hours', featured: true, img: IMG.wash,
    short: 'Everyday clothes, sorted by colour and fabric, washed, dried and folded ready to put away.',
    features: ['Sorted by colour and fabric before washing', 'Washed at the temperature on the care label', 'Tumble dried on low heat unless the label says otherwise', 'Folded and packed in a reusable bag'],
    care: 'We wash at the temperature marked on each garment\'s care label and air-dry anything marked "do not tumble dry". Let us know about any items that need cold wash only.',
    pricing: { standard: 3.5, express: 5.0 }, minNote: 'Minimum order 3 kg' },
  { id: 'ironing', cat: 'everyday', name: 'Ironing & Pressing', unit: 'item', price: 2.2, turnaround: 'Same day if dropped off before 10am, otherwise 24 hours', featured: true, img: IMG.iron,
    short: 'Crisp, hung and ready to wear. Shirts, trousers, dresses and linens pressed by hand.',
    features: ['Hand-pressed with fabric-appropriate heat', 'Shirts finished on a shirt press for sharp collars and cuffs', 'Delicate fabrics steamed rather than ironed flat', 'Returned on hangers or folded, your choice'],
    care: 'Cottons and linens are pressed at higher heat; silks, synthetics and delicate prints are steamed to avoid scorch marks or shine.',
    pricing: { standard: 2.2, express: 3.2 }, minNote: 'Minimum order 5 items' },
  { id: 'linen-cleaning', cat: 'everyday', name: 'Household Linen Cleaning', unit: 'kg', price: 4.0, turnaround: '48 hours', featured: true, img: IMG.linen,
    short: 'Bedsheets, duvet covers, towels and tablecloths washed hot for hygiene and folded flat.',
    features: ['Washed at high temperature for a genuine deep clean', 'Duvets and pillows fluff-dried to restore loft', 'Folded flat and stacked, ready for the linen cupboard', 'Bulk pricing for full bedding sets'],
    care: 'Bedding and towels are washed hotter than clothing to remove dust mites and odours; delicate embroidered linens are washed on a gentler cycle on request.',
    pricing: { standard: 4.0, express: 5.5 }, minNote: 'Minimum order 4 kg' },
  { id: 'dry-cleaning', cat: 'dryclean', name: 'Dry Cleaning', unit: 'item', price: 8.0, turnaround: '48 hours', featured: true, img: IMG.dry,
    short: 'Solvent-cleaned rather than washed with water. The right choice for wool, silk and structured garments.',
    features: ['Solvent cleaning suited to wool, silk and tailoring', 'Structured items re-blocked to hold their shape', 'Buttons and trims checked before cleaning', 'Delivered on a hanger, ready to wear'],
    care: 'Dry cleaning uses a gentle solvent instead of water, which protects garments that would shrink, bleed colour or lose shape in a normal wash.',
    pricing: { standard: 8.0, express: 11.5 }, minNote: 'No minimum order' },
  { id: 'premium-care', cat: 'dryclean', name: 'Premium Garment Care', unit: 'item', price: 15.0, turnaround: '72 hours', featured: true, img: IMG.premium,
    short: 'Hand-finished cleaning for suits, gowns and garments with beading, sequins or leather trim.',
    features: ['Hand inspection of trims, beading and linings', 'Individually cleaned, never batched with other loads', 'Hand-finished pressing on a padded board', 'Garment bag and padded hanger included'],
    care: 'Beaded, sequined and leather-trimmed pieces are cleaned by hand rather than machine, with extra attention to any loose stitching or embellishment.',
    pricing: { standard: 15.0, express: 21.0 }, minNote: 'No minimum order' },
  { id: 'stain-removal', cat: 'specialty', name: 'Stain Removal', unit: 'item', price: 6.0, turnaround: '48 to 72 hours depending on the stain', featured: false, img: IMG.stain,
    short: 'Targeted pre-treatment for wine, oil, ink, grass and other stubborn marks.',
    features: ['Stain identified and matched to the right treatment', 'Spot-tested on an inside seam before full treatment', 'Combined with a wash or dry clean as needed', 'Honest note if a stain cannot fully lift'],
    care: 'Results depend on the stain type, the fabric and how long the stain has set. We treat every stain but cannot guarantee complete removal on old or set-in marks.',
    pricing: { standard: 6.0, express: 9.0 }, minNote: 'No minimum order' },
  { id: 'shoe-cleaning', cat: 'specialty', name: 'Shoe Cleaning', unit: 'pair', price: 12.0, turnaround: '72 hours', featured: false, img: IMG.shoe,
    short: 'Hand-cleaned uppers, soles and laces for sneakers, leather shoes and suede.',
    features: ['Hand-cleaned uppers, midsoles and outsoles', 'Suede and nubuck treated with the right brush and cleaner', 'Leather conditioned to prevent cracking', 'Laces washed separately or replaced on request'],
    care: 'Suede and leather are cleaned with materials matched to that surface; we do not machine-wash shoes, which can damage glue and structure.',
    pricing: { standard: 12.0, express: 17.0 }, minNote: 'No minimum order' },
  { id: 'blanket-duvet', cat: 'everyday', name: 'Blanket & Duvet Cleaning', unit: 'item', price: 14.0, turnaround: '48 hours', featured: false, img: IMG.blanket,
    short: 'Deep-cleaned duvets, quilts and blankets, fully dried and fluffed so they come back fresh and light.',
    features: ['Large-capacity machines so bulky bedding gets properly clean', 'Washed at a temperature suited to the filling and cover', 'Fully dried and fluffed to restore loft', 'Returned folded flat in a protective bag'],
    care: 'Down, feather and synthetic fillings are cleaned differently; we check each label and wash at the right temperature, then dry thoroughly so no dampness or odour is left behind.',
    pricing: { standard: 14.0, express: 19.0 }, minNote: 'No minimum order' },
  { id: 'woollens-scarves', cat: 'specialty', name: 'Woollens & Scarves Care', unit: 'item', price: 7.0, turnaround: '72 hours', featured: false, img: IMG.woollen,
    short: 'Gentle hand-washing for sweaters, shawls and scarves in wool, cashmere and other delicate knits.',
    features: ['Hand-washed in cool water with a wool-safe detergent', 'Never wrung or tumble dried, so knits keep their shape', 'Laid flat to dry and gently reshaped', 'Pilling and loose threads noted before cleaning'],
    care: 'Wool and cashmere shrink and felt with heat and agitation, so these pieces are washed by hand in cool water and dried flat rather than machine washed.',
    pricing: { standard: 7.0, express: 10.0 }, minNote: 'No minimum order' }
];

const PROCESS = [
  { title: 'Book & schedule', text: 'Choose your services, add quantities and pick a pickup window that suits you.' },
  { title: 'We collect', text: 'A driver collects your bag at your door within the scheduled window.' },
  { title: 'Clean & check', text: 'Your items are sorted, cleaned to their care label and checked by our quality team.' },
  { title: 'Delivered back', text: 'Folded or on hangers, delivered to your door in the window you chose.' }
];

const TRACK_STAGES = ['Pickup scheduled', 'Items received', 'Cleaning in progress', 'Quality check', 'Out for delivery', 'Delivered'];

const POSTS = [
  { id: 'remove-common-stains', title: 'How to treat five common stains before they set', cat: 'Garment care', date: '2026-09-05', author: 'Renee Castillo', img: IMG.blog3,
    excerpt: 'Wine, oil, ink, grass and coffee each need a different first move. Here is what to do in the first ten minutes.',
    body: ['The single biggest factor in whether a stain comes out is how quickly you act. A fresh stain is a solvable problem; a stain that has dried in overnight is a much harder one.', 'For wine, blot rather than rub, and avoid hot water, which can set the colour. For oil-based marks like salad dressing or makeup, a little dish soap worked in gently before washing helps break down the grease. Ink is best treated on the reverse of the fabric with a clean cloth so it does not spread further.', 'Grass stains respond well to a pre-wash spot treatment with an enzyme-based cleaner. Coffee, like wine, wants cool water and a gentle blot. If a stain has already set, do not despair, our stain-removal service is built for exactly that situation.'] },
  { id: 'delicate-fabric-care', title: 'Caring for silk, wool and other delicate fabrics at home', cat: 'Garment care', date: '2026-08-19', author: 'Priya Nathan', img: IMG.blog2,
    excerpt: 'Between professional cleanings, a few habits keep delicate fabrics looking new for years longer.',
    body: ['Delicate fabrics fail more often from everyday handling than from a single bad wash. Hanging silk on a padded hanger instead of a wire one prevents shoulder bumps. Folding knitwear rather than hanging it stops the fibres stretching under their own weight.', 'Store wool with cedar blocks rather than mothballs, which can leave an odour. Let any fabric air out for a few hours before putting it away, since packing away body moisture is one of the most common causes of musty smells and moth damage.', 'When in doubt about whether something is washable at home, our premium garment care service is designed for exactly these fabrics, with hand cleaning and individual attention.'] },
  { id: 'truth-about-dry-cleaning', title: 'The truth about dry cleaning: what the solvent actually does', cat: 'Behind the scenes', date: '2026-07-22', author: 'Marcus Ellery', img: IMG.blog1,
    excerpt: 'Dry cleaning is not dry, and it is not just for fancy clothes. Here is what actually happens to your garment.',
    body: ['"Dry" cleaning refers to the absence of water, not the absence of liquid. Garments are cleaned in a gentle solvent that lifts oil-based soil without the swelling and shrinking that water causes in some fibres.', 'This matters most for structured garments like blazers and coats, which rely on internal linings and interfacing to hold their shape. Water can warp these layers; solvent generally does not.', 'Not every garment marked "dry clean only" will be ruined by a careful home wash, but the label is there because the maker tested it and found water risky. When it matters, we would rather you trust the label.'] },
  { id: 'how-often-wash-bedding', title: 'How often should you really wash your bedding?', cat: 'Home & linens', date: '2026-06-30', author: 'Renee Castillo', img: IMG.blog4,
    excerpt: 'Sheets collect more than you would like to think about. Here is a realistic weekly-ish schedule.',
    body: ['Most guidance settles on once a week for sheets and pillowcases, since they collect sweat, skin cells and dust mites that can affect allergies and skin. Duvet covers can stretch to every two weeks if a top sheet is used underneath.', 'Towels dry between uses but still benefit from a wash every three to four uses, since damp fabric is a good environment for bacteria. Duvets and pillows themselves need washing far less often, every few months is enough for most households.', 'If a weekly wash is one more thing on a long list, our household linen service handles the whole set, sheets, towels and all, on a schedule that fits yours.'] },
  { id: 'packing-laundry-travel', title: 'Packing and laundry tips for long trips', cat: 'Lifestyle', date: '2026-06-02', author: 'Marcus Ellery', img: IMG.blog5,
    excerpt: 'Travelling light usually means doing laundry away from home. A few packing habits make that easier.',
    body: ['Packing cubes separated into "clean" and "worn" save you from digging through a bag to find out what is wearable. A lightweight mesh laundry bag folds flat and keeps worn items away from clean ones in transit.', 'For longer trips, plan for one mid-trip laundry stop rather than packing for every single day; it usually saves both luggage weight and space. Quick-dry fabrics are worth the investment if you travel often, since they can be hand-washed in a sink and worn again within hours.', 'If you are back in town and behind on laundry after a trip, a same-day wash and fold order is often the fastest way to reset.'] },
  { id: 'shoe-care-between-cleanings', title: 'Keeping your shoes fresh between cleanings', cat: 'Garment care', date: '2026-05-14', author: 'Priya Nathan', img: IMG.blog6,
    excerpt: 'Small daily habits keep sneakers and leather shoes looking good for far longer between professional cleans.',
    body: ['Rotating between at least two pairs of regularly worn shoes gives each pair time to fully dry out, which matters more for odour and material longevity than most people expect.', 'A soft brush and a damp cloth after a muddy walk take care of most day-to-day dirt on leather and canvas alike; letting mud dry and then brushing it off works better than scrubbing it in wet.', 'Suede needs a dedicated suede brush and should never be cleaned with water, which can leave permanent watermarks. When shoes need more than a wipe-down, our shoe cleaning service handles uppers, soles and laces by hand.'] }
];

const TEAM = [
  { name: 'Priya Nathan', role: 'Founder & operations lead', img: IMG.team2, bio: 'Started Fold & Fresh after one too many ruined sweaters from a corner-store dry cleaner. Runs day-to-day operations.' },
  { name: 'Marcus Ellery', role: 'Head of quality control', img: IMG.team4, bio: 'Checks every garment before it leaves the facility. Has strong opinions about steam pressing.' },
  { name: 'Renee Castillo', role: 'Fleet & logistics manager', img: IMG.team1, bio: 'Plans pickup and delivery routes so your window actually means something.' },
  { name: 'Dev Okonkwo', role: 'Customer care lead', img: IMG.team3, bio: 'First point of contact for questions, changes and anything that needs sorting out.' }
];

const TESTIMONIALS = [
  { q: 'I schedule a pickup before I leave for work and my clean laundry is on the doorstep by the time I am home. It has genuinely given me an evening back each week.', by: 'Farrah, marketing manager' },
  { q: 'My wool coat came back from premium care looking better than when I bought it. They caught a loose button lining I had not even noticed.', by: 'Tobias, architect' },
  { q: 'We run a short-term rental and Fold & Fresh handles all our linen turnover. Same-day service has saved more than one tight changeover.', by: 'Anaya, Airbnb host' },
  { q: 'The stain removal service saved a christening gown that had been sitting with a set-in stain for months. I did not think it was possible.', by: 'Liam, parent' }
];

const FAQS = [
  { cat: 'Booking & scheduling', q: 'How do I schedule a pickup?', a: 'Choose your services on the Services page, add them to your booking, then pick a pickup window and delivery window that suit you on the booking page. You will get a confirmation with your order reference.' },
  { cat: 'Booking & scheduling', q: 'Can I change or cancel a pickup?', a: 'Yes, up to two hours before your scheduled pickup window, from your dashboard or by contacting customer care. Cancellations after that may not be possible if a driver is already on the way.' },
  { cat: 'Booking & scheduling', q: 'What are your pickup and delivery hours?', a: 'We collect and deliver seven days a week between 8am and 8pm, with a shorter Sunday window. Exact hours are shown when you choose your time slot.' },
  { cat: 'Pricing & payment', q: 'How is wash & fold priced?', a: 'Wash & fold and household linens are priced per kilogram; ironing, dry cleaning and specialty services are priced per item or pair. Full pricing is on the Pricing page.' },
  { cat: 'Pricing & payment', q: 'What payment methods do you accept?', a: 'We accept major credit and debit cards, digital wallets, and cash on delivery. Business and corporate accounts can request monthly invoicing.' },
  { cat: 'Pricing & payment', q: 'Is there an express option?', a: 'Yes. Express turnaround is available on every service for a surcharge, roughly 40 to 45 percent above the standard price, shown at checkout when you choose your window.' },
  { cat: 'Pickup & delivery', q: 'Which areas do you deliver to?', a: 'We currently cover the zones listed on our Contact page. Same-day service is available in the core zones; outer zones run on next-day turnaround.' },
  { cat: 'Pickup & delivery', q: 'Do I need to be home for pickup or delivery?', a: 'No. You can leave your bag in a designated spot and we will leave your cleaned items there too, as long as your building allows unattended drop-off. Let us know your preference when booking.' },
  { cat: 'Garment care & policies', q: 'What happens if something is damaged or missing?', a: 'Tell us within 48 hours of delivery. We investigate every report, and confirmed damage or loss is compensated up to the garment\'s reasonable replacement value, or the item is re-cleaned at no charge if the issue is a cleaning fault.' },
  { cat: 'Garment care & policies', q: 'Do you remove all stains?', a: 'We treat every stain reported to us, but results depend on the fabric, the substance and how long it has set. We will always tell you honestly if a stain did not fully lift.' },
  { cat: 'Garment care & policies', q: 'What if a care label is missing or unclear?', a: 'We use our best judgement based on fabric type and construction, and we will contact you first for anything unusual or high-value before proceeding.' }
];

const PLANS = {
  onetime: [
    { name: 'Pay as you go', price: 'Standard pricing', blurb: 'Order whenever you need it, no commitment.', items: ['Standard 24 to 72 hour turnaround by service', 'Express option available on any order', 'Pay by card, wallet or cash on delivery', 'No minimum number of orders'] },
    { name: 'Weekly saver', price: '10% off wash & fold and linens', best: true, blurb: 'A standing weekly pickup for regular laundry.', items: ['Everything in Pay as you go', 'Recurring weekly pickup window reserved for you', '10% off wash & fold and linen cleaning', 'Free rescheduling of your weekly slot'] },
    { name: 'Monthly family plan', price: '20% off plus free pickup', blurb: 'For households with steady, larger volumes.', items: ['Everything in Weekly saver', '20% off wash & fold, linens and ironing', 'Free pickup and delivery on every order', 'Priority customer care line'] }
  ],
  business: [
    { name: 'Starter business', price: 'Pay per collection', blurb: 'For small offices, studios and Airbnb hosts.', items: ['Flexible one-off and recurring collections', 'Itemised receipts for expense tracking', 'Standard 48 hour turnaround', 'Card or monthly invoicing'] },
    { name: 'Growth partner', price: 'Volume pricing', best: true, blurb: 'For gyms, salons and hosts with regular turnover.', items: ['Everything in Starter business', 'Discounted per-kilogram rates at volume', 'Dedicated account contact', 'Same-day turnaround in core zones'] },
    { name: 'Hotel & hospitality', price: 'Custom contract', blurb: 'For hotels and serviced apartments with daily linen needs.', items: ['Everything in Growth partner', 'Daily collection windows', 'Dedicated linen inventory management', 'Custom SLA and reporting'] }
  ]
};

const AREAS = [
  { name: 'Downtown & Riverside', same_day: true }, { name: 'Maple Heights', same_day: true },
  { name: 'Old Mill District', same_day: true }, { name: 'Northgate', same_day: false },
  { name: 'Fairview Park', same_day: false }, { name: 'Lakeside Commons', same_day: false },
  { name: 'Brookfield', same_day: false }, { name: 'Elm Corner', same_day: false }
];

const PAYMENT_METHODS = ['Credit & debit cards', 'Digital wallets (Apple Pay, Google Pay)', 'Cash on delivery', 'Corporate monthly invoicing'];

const HOURS = [ // 0 = Sunday
  [9, 17], [8, 20], [8, 20], [8, 20], [8, 20], [8, 20], [8, 18]
];
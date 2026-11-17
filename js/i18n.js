const LANG_STORAGE_KEY = 'nova_shop_lang';
export const DEFAULT_LANG = 'vi';

const DICTIONARY = {
  vi: {
    'title.home': 'NOVA-SHOP — Thiết bị tinh gọn cho không gian sống hiện đại',
    'title.shop': 'Danh mục sản phẩm — NOVA-SHOP',
    'title.cart': 'Giỏ hàng — NOVA-SHOP',
    'title.checkout': 'Thanh toán — NOVA-SHOP',
    'nav.home': 'Trang chủ',
    'nav.shop': 'Cửa hàng',
    'nav.cart': 'Giỏ hàng',
    'nav.checkout': 'Thanh toán',
    'header.bag': 'Giỏ',
    'header.bagAria': 'Mở giỏ hàng',
    'header.menuAria': 'Mở menu điều hướng',
    'header.langAria': 'Chọn ngôn ngữ',
    'drawer.title': 'Giỏ hàng',
    'drawer.closeAria': 'Đóng giỏ hàng',
    'drawer.emptyTitle': 'Giỏ hàng đang trống',
    'drawer.emptyDesc': 'Khám phá loa tối giản, đèn kiến trúc và phụ kiện bàn làm việc.',
    'drawer.browseCta': 'Xem danh mục',
    'drawer.subtotal': 'Tạm tính',
    'drawer.viewCart': 'Xem giỏ hàng',
    'drawer.checkout': 'Thanh toán',
    'footer.copy': '© 2026 NOVA-SHOP Thiết Bị Tối Giản. Bảo lưu mọi quyền.',
    'hero.meta': 'Bộ sưu tập Studio Thu · Nhôm Anodized & Thủy tinh',
    'hero.title': 'Thiết kế tinh xảo cho không gian làm việc',
    'hero.subtitle':
      'Đèn bàn kiến trúc, loa âm thanh chuẩn xác và phụ kiện kim loại nguyên khối cho sự tập trung bền bỉ.',
    'hero.ctaPrimary': 'Khám phá bộ sưu tập',
    'hero.ctaSecondary': 'Mua đồ Âm thanh',
    'home.featuredKicker': 'Ra mắt nổi bật',
    'home.featuredTitle': 'Sản phẩm chủ đạo',
    'home.viewAll': 'Xem tất cả sản phẩm →',
    'home.recKicker': 'Gợi ý cho không gian của bạn',
    'home.recTitle': 'Sản phẩm kết hợp gợi ý',
    'home.browseCatalog': 'Xem toàn bộ danh mục →',
    'assurance.1.title': 'Giao hàng miễn phí',
    'assurance.1.desc': 'Miễn phí vận chuyển Tiêu chuẩn cho đơn hàng từ $150.',
    'assurance.2.title': 'Bảo hành phần cứng 2 năm',
    'assurance.2.desc': 'Hỗ trợ thay thế linh kiện và sửa chữa trực tiếp tại studio.',
    'assurance.3.title': 'Dùng thử tại nhà 30 ngày',
    'assurance.3.desc': 'Trải nghiệm đèn và loa ngay trong không gian làm việc thực tế.',
    'assurance.4.title': 'Thanh toán linh hoạt',
    'assurance.4.desc': 'Hỗ trợ Thẻ ngân hàng, Thanh toán khi nhận hàng (COD) hoặc chuyển khoản.',
    'product.details': 'Chi tiết',
    'product.addToBag': 'Thêm vào giỏ',
    'product.finishLabel': 'Phiên bản:',
    'product.relatedTitle': 'Gợi ý kết hợp phù hợp',
    'product.closeModalAria': 'Đóng chi tiết sản phẩm',
    'product.qtyDecAria': 'Giảm số lượng',
    'product.qtyIncAria': 'Tăng số lượng',
    'toast.added': 'Đã thêm {name} vào giỏ hàng',
    'shop.kicker': 'Danh mục đầy đủ',
    'shop.title': 'Bộ Sưu Tập Studio',
    'shop.subtitle':
      'Lọc theo danh mục, chất liệu hoặc mức giá. Chọn từng sản phẩm để xem thông số và phiên bản màu.',
    'shop.countSingular': '1 sản phẩm',
    'shop.countPlural': '{n} sản phẩm',
    'shop.searchLabel': 'Tìm kiếm sản phẩm',
    'shop.searchPlaceholder': 'Tìm tên sản phẩm, chất liệu, mã SKU...',
    'shop.searchClearAria': 'Xóa từ khóa tìm kiếm',
    'shop.priceLabel': 'Mức giá tối đa',
    'shop.priceAll': 'Tất cả mức giá',
    'shop.price150': 'Dưới $150',
    'shop.price200': 'Dưới $200',
    'shop.price300': 'Dưới $300',
    'shop.sortLabel': 'Sắp xếp sản phẩm',
    'shop.sortFeatured': 'Sắp xếp: Nổi bật',
    'shop.sortPriceAsc': 'Giá: Thấp đến Cao',
    'shop.sortPriceDesc': 'Giá: Cao đến Thấp',
    'shop.sortRating': 'Đánh giá cao nhất',
    'shop.emptyTitle': 'Không tìm thấy sản phẩm phù hợp',
    'shop.emptyDesc': 'Hãy thử xóa từ khóa tìm kiếm hoặc chuyển về tất cả danh mục.',
    'shop.resetBtn': 'Đặt lại bộ lọc',
    'cart.kicker': 'Kiểm tra đơn hàng',
    'cart.title': 'Giỏ hàng',
    'cart.subtitle': 'Điều chỉnh số lượng, áp dụng mã giảm giá studio và ước tính phí vận chuyển.',
    'cart.continue': 'Tiếp tục mua sắm →',
    'cart.emptyTitle': 'Giỏ hàng của bạn đang trống',
    'cart.emptyDesc': 'Thêm loa chuẩn studio, đèn bàn kiến trúc hoặc phụ kiện từ danh mục.',
    'cart.emptyCta': 'Khám phá danh mục',
    'cart.itemsHeading': 'Sản phẩm',
    'cart.itemSingular': '1 sản phẩm',
    'cart.itemPlural': '{n} sản phẩm',
    'cart.clearBag': 'Xóa tất cả',
    'cart.freeShipUnlocked': 'Đơn hàng của bạn đủ điều kiện miễn phí vận chuyển Tiêu chuẩn.',
    'cart.freeShipRemaining': 'Thêm {amount} nữa để được miễn phí vận chuyển Tiêu chuẩn.',
    'cart.each': '{price} / sản phẩm',
    'cart.remove': 'Xóa',
    'cart.summaryTitle': 'Tóm tắt đơn hàng',
    'cart.promoLabel': 'Mã giảm giá',
    'cart.promoPlaceholder': 'Mã giảm giá (vd: NOVA10)',
    'cart.promoApply': 'Áp dụng',
    'cart.promoHint': 'Mã ưu đãi hiện có: NOVA10 (giảm 10%) · WELCOME20 (giảm $20 cho đơn từ $100)',
    'cart.subtotal': 'Tạm tính',
    'cart.promoDiscount': 'Giảm giá ưu đãi',
    'cart.shipping': 'Phí vận chuyển',
    'cart.shippingFree': 'Miễn phí',
    'cart.tax': 'Thuế ước tính (8%)',
    'cart.estimatedTotal': 'Tổng ước tính',
    'cart.proceedCheckout': 'Tiến hành thanh toán',
    'cart.recKicker': 'Kết hợp cùng giỏ hàng',
    'cart.recTitle': 'Sản phẩm gợi ý bổ sung',
    'cart.recLink': 'Xem toàn bộ danh mục →',
    'promo.empty': 'Vui lòng nhập mã giảm giá để áp dụng.',
    'promo.invalid': 'Mã "{code}" không hợp lệ. Hãy thử NOVA10 hoặc WELCOME20.',
    'promo.minSubtotal': 'Mã {code} áp dụng cho đơn hàng từ {min} trở lên.',
    'promo.applied': 'Đã áp dụng {code}: {label}',
    'promo.NOVA10.label': 'Ưu đãi thành viên Studio giảm 10%',
    'promo.WELCOME20.label': 'Giảm $20 chào mừng (đơn từ $100)',
    'checkout.kicker': 'Đặt hàng bảo mật',
    'checkout.title': 'Thanh toán',
    'checkout.subtitle': 'Nhập thông tin giao hàng và chọn phương thức thanh toán phù hợp.',
    'checkout.backToBag': '← Quay lại Giỏ hàng',
    'checkout.emptyTitle': 'Giỏ hàng đang trống',
    'checkout.emptyDesc': 'Vui lòng chọn sản phẩm trong danh mục trước khi tiến hành thanh toán.',
    'checkout.emptyCta': 'Xem danh mục',
    'checkout.s1': '01. Thông tin liên hệ',
    'checkout.fullName': 'Họ và tên',
    'checkout.email': 'Địa chỉ Email',
    'checkout.phone': 'Số điện thoại',
    'checkout.s2': '02. Địa chỉ giao hàng',
    'checkout.address': 'Địa chỉ nhận hàng',
    'checkout.city': 'Tỉnh / Thành phố',
    'checkout.postalCode': 'Mã bưu điện / ZIP',
    'checkout.country': 'Quốc gia',
    'checkout.s3': '03. Phương thức vận chuyển',
    'checkout.shipStandardTitle': 'Giao hàng Tiêu chuẩn',
    'checkout.shipStandardDesc': '3-5 ngày làm việc · Miễn phí cho đơn từ $150',
    'checkout.shipExpressTitle': 'Giao hàng Hỏa tốc',
    'checkout.shipExpressDesc': '1-2 ngày làm việc · Ưu tiên theo dõi đơn',
    'checkout.s4': '04. Phương thức thanh toán',
    'checkout.payCardTitle': 'Thẻ tín dụng / Thẻ ghi nợ',
    'checkout.payCardDesc': 'Visa, Mastercard, American Express',
    'checkout.payCodTitle': 'Thanh toán khi nhận hàng (COD)',
    'checkout.payCodDesc': 'Kiểm tra và thanh toán trực tiếp khi nhận kiện hàng',
    'checkout.payBankTitle': 'Chuyển khoản ngân hàng',
    'checkout.payBankDesc': 'Nhận hướng dẫn chuyển khoản ngay sau khi xác nhận',
    'checkout.cardNumber': 'Số thẻ',
    'checkout.cardExpiry': 'Ngày hết hạn (MM/YY)',
    'checkout.cardCvc': 'Mã bảo mật (CVC)',
    'checkout.codNote':
      'Đơn hàng Thanh toán khi nhận hàng (COD) sẽ được xác nhận qua điện thoại trước khi xuất kho. Vui lòng chuẩn bị đúng tổng tiền khi nhận hàng.',
    'checkout.bankNote':
      'Thông tin chuyển khoản và mã tham chiếu đơn hàng sẽ hiển thị ngay sau khi bạn nhấn Đặt hàng ngay.',
    'checkout.placeOrder': 'Đặt hàng ngay',
    'checkout.total': 'Tổng cộng',
    'err.fullName': 'Vui lòng nhập họ và tên.',
    'err.email': 'Vui lòng nhập địa chỉ email hợp lệ.',
    'err.phone': 'Vui lòng nhập số điện thoại hợp lệ (tối thiểu 8 chữ số).',
    'err.address': 'Vui lòng nhập địa chỉ nhận hàng.',
    'err.city': 'Vui lòng nhập tỉnh / thành phố.',
    'err.postalCode': 'Vui lòng nhập mã bưu điện hoặc ZIP hợp lệ.',
    'err.country': 'Vui lòng chọn quốc gia giao hàng.',
    'err.cardNumber': 'Nhập số thẻ hợp lệ gồm 13 đến 19 chữ số.',
    'err.cardExpiry': 'Sử dụng định dạng MM/YY.',
    'err.cardCvc': 'Nhập mã bảo mật gồm 3 hoặc 4 chữ số.',
    'confirm.status': 'Đã xác nhận đơn hàng · Đang chuẩn bị giao',
    'confirm.thankYou': 'Cảm ơn bạn, {name}',
    'confirm.subtitle': 'Đơn hàng <strong>#{orderId}</strong> đã được ghi nhận cho {email}.',
    'confirm.ref': 'Mã đơn hàng',
    'confirm.date': 'Ngày đặt',
    'confirm.address': 'Địa chỉ giao hàng',
    'confirm.shipPay': 'Vận chuyển & Thanh toán',
    'confirm.discount': 'Giảm giá ({code})',
    'confirm.totalPaid': 'Tổng thanh toán',
    'confirm.continue': 'Tiếp tục mua sắm',
    'confirm.home': 'Về trang chủ',
  },
  en: {
    'title.home': 'NOVA-SHOP — Precision Objects for Everyday Spaces',
    'title.shop': 'Catalog — NOVA-SHOP',
    'title.cart': 'Shopping Bag — NOVA-SHOP',
    'title.checkout': 'Checkout — NOVA-SHOP',
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.cart': 'Cart',
    'nav.checkout': 'Checkout',
    'header.bag': 'Bag',
    'header.bagAria': 'Open shopping bag',
    'header.menuAria': 'Toggle navigation menu',
    'header.langAria': 'Select language',
    'drawer.title': 'Shopping Bag',
    'drawer.closeAria': 'Close shopping bag',
    'drawer.emptyTitle': 'Your bag is empty',
    'drawer.emptyDesc': 'Explore precision audio, lighting, and desk objects.',
    'drawer.browseCta': 'Browse Catalog',
    'drawer.subtotal': 'Subtotal',
    'drawer.viewCart': 'View Cart',
    'drawer.checkout': 'Checkout',
    'footer.copy': '© 2026 NOVA-SHOP Industrial Objects. All rights reserved.',
    'hero.meta': 'Autumn Studio Edition · Milled Aluminum & Glass',
    'hero.title': 'Precision objects for everyday spaces',
    'hero.subtitle':
      'Architectural lighting, acoustic speakers, and tactile desk hardware engineered for longevity and calm focus.',
    'hero.ctaPrimary': 'Explore Collection',
    'hero.ctaSecondary': 'Shop Audio',
    'home.featuredKicker': 'Featured Release',
    'home.featuredTitle': 'Flagship studio essentials',
    'home.viewAll': 'View all objects →',
    'home.recKicker': 'Curated For Your Space',
    'home.recTitle': 'Recommended pairings',
    'home.browseCatalog': 'Browse catalog →',
    'assurance.1.title': 'Complimentary Delivery',
    'assurance.1.desc': 'Free Standard Ground shipping on all orders over $150.',
    'assurance.2.title': '2-Year Hardware Warranty',
    'assurance.2.desc': 'Direct component replacement and studio repair coverage.',
    'assurance.3.title': '30-Day Home Trial',
    'assurance.3.desc': 'Evaluate every lamp and speaker inside your own workspace.',
    'assurance.4.title': 'Flexible Payment',
    'assurance.4.desc': 'Card, Cash on Delivery, or direct bank transfer supported.',
    'product.details': 'Details',
    'product.addToBag': 'Add to Bag',
    'product.finishLabel': 'Finish:',
    'product.relatedTitle': 'Recommended Pairings',
    'product.closeModalAria': 'Close product details',
    'product.qtyDecAria': 'Decrease quantity',
    'product.qtyIncAria': 'Increase quantity',
    'toast.added': 'Added {name} to bag',
    'shop.kicker': 'Complete Catalog',
    'shop.title': 'Studio Collection',
    'shop.subtitle':
      'Filter by category, material, or price ceiling. Select any object to inspect specifications and finishes.',
    'shop.countSingular': '1 object',
    'shop.countPlural': '{n} objects',
    'shop.searchLabel': 'Search products',
    'shop.searchPlaceholder': 'Search objects, materials, SKU...',
    'shop.searchClearAria': 'Clear search',
    'shop.priceLabel': 'Maximum price',
    'shop.priceAll': 'All prices',
    'shop.price150': 'Under $150',
    'shop.price200': 'Under $200',
    'shop.price300': 'Under $300',
    'shop.sortLabel': 'Sort products',
    'shop.sortFeatured': 'Sort: Featured',
    'shop.sortPriceAsc': 'Price: Low to High',
    'shop.sortPriceDesc': 'Price: High to Low',
    'shop.sortRating': 'Top Rated',
    'shop.emptyTitle': 'No objects match those filters',
    'shop.emptyDesc': 'Try clearing your search term or switching back to all categories.',
    'shop.resetBtn': 'Reset Filters',
    'cart.kicker': 'Order Review',
    'cart.title': 'Shopping Bag',
    'cart.subtitle': 'Adjust quantities, apply a studio promo code, and calculate shipping.',
    'cart.continue': 'Continue shopping →',
    'cart.emptyTitle': 'Your shopping bag is currently empty',
    'cart.emptyDesc': 'Add precision speakers, task lamps, or desk accessories from our catalog.',
    'cart.emptyCta': 'Explore Catalog',
    'cart.itemsHeading': 'Items',
    'cart.itemSingular': '1 item',
    'cart.itemPlural': '{n} items',
    'cart.clearBag': 'Clear Bag',
    'cart.freeShipUnlocked': 'Your order qualifies for complimentary Standard Ground shipping.',
    'cart.freeShipRemaining': 'Add {amount} more to unlock complimentary Standard Ground shipping.',
    'cart.each': '{price} each',
    'cart.remove': 'Remove',
    'cart.summaryTitle': 'Order Summary',
    'cart.promoLabel': 'Promo code',
    'cart.promoPlaceholder': 'Promo code (e.g. NOVA10)',
    'cart.promoApply': 'Apply',
    'cart.promoHint': 'Available studio codes: NOVA10 (10% off) · WELCOME20 ($20 off $100+)',
    'cart.subtotal': 'Subtotal',
    'cart.promoDiscount': 'Promo Discount',
    'cart.shipping': 'Shipping',
    'cart.shippingFree': 'Free',
    'cart.tax': 'Estimated Tax (8%)',
    'cart.estimatedTotal': 'Estimated Total',
    'cart.proceedCheckout': 'Proceed to Checkout',
    'cart.recKicker': 'Pair With Your Bag',
    'cart.recTitle': 'Complementary studio objects',
    'cart.recLink': 'View full catalog →',
    'promo.empty': 'Enter a promo code to apply.',
    'promo.invalid': 'Code "{code}" is not recognized. Try NOVA10 or WELCOME20.',
    'promo.minSubtotal': '{code} requires a subtotal of at least {min}.',
    'promo.applied': 'Applied {code}: {label}',
    'promo.NOVA10.label': '10% Studio Member Discount',
    'promo.WELCOME20.label': '$20 Welcome Credit (orders $100+)',
    'checkout.kicker': 'Secure Dispatch',
    'checkout.title': 'Checkout',
    'checkout.subtitle': 'Enter your delivery details and choose your preferred payment method.',
    'checkout.backToBag': '← Return to Bag',
    'checkout.emptyTitle': 'Your bag is empty',
    'checkout.emptyDesc': 'Select objects from the catalog before proceeding to checkout.',
    'checkout.emptyCta': 'Browse Catalog',
    'checkout.s1': '01. Contact Information',
    'checkout.fullName': 'Full Name',
    'checkout.email': 'Email Address',
    'checkout.phone': 'Phone Number',
    'checkout.s2': '02. Shipping Address',
    'checkout.address': 'Street Address',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal / ZIP Code',
    'checkout.country': 'Country',
    'checkout.s3': '03. Delivery Speed',
    'checkout.shipStandardTitle': 'Standard Ground',
    'checkout.shipStandardDesc': '3-5 business days · Free on orders $150+',
    'checkout.shipExpressTitle': 'Express Air',
    'checkout.shipExpressDesc': '1-2 business days · Priority tracked dispatch',
    'checkout.s4': '04. Payment Method',
    'checkout.payCardTitle': 'Credit / Debit Card',
    'checkout.payCardDesc': 'Visa, Mastercard, American Express',
    'checkout.payCodTitle': 'Cash on Delivery (COD)',
    'checkout.payCodDesc': 'Pay upon parcel inspection at your door',
    'checkout.payBankTitle': 'Direct Bank Transfer',
    'checkout.payBankDesc': 'Instant wire instructions after confirmation',
    'checkout.cardNumber': 'Card Number',
    'checkout.cardExpiry': 'Expiration (MM/YY)',
    'checkout.cardCvc': 'Security Code (CVC)',
    'checkout.codNote':
      'Cash on Delivery is confirmed via phone prior to dispatch. Please prepare the exact total upon arrival.',
    'checkout.bankNote':
      'Wire instructions and your unique order reference number will appear immediately upon submitting this form.',
    'checkout.placeOrder': 'Place Order',
    'checkout.total': 'Total',
    'err.fullName': 'Please enter your full name.',
    'err.email': 'Enter a valid email address.',
    'err.phone': 'Enter a valid phone number (at least 8 digits).',
    'err.address': 'Enter your street address.',
    'err.city': 'Enter your city.',
    'err.postalCode': 'Enter a valid postal or ZIP code.',
    'err.country': 'Select a delivery country.',
    'err.cardNumber': 'Enter a 13 to 19 digit card number.',
    'err.cardExpiry': 'Use MM/YY format.',
    'err.cardCvc': 'Enter a 3 or 4 digit security code.',
    'confirm.status': 'Order Confirmed · Preparing Shipment',
    'confirm.thankYou': 'Thank you, {name}',
    'confirm.subtitle': 'Order <strong>#{orderId}</strong> has been registered for {email}.',
    'confirm.ref': 'Order Reference',
    'confirm.date': 'Date Placed',
    'confirm.address': 'Delivery Address',
    'confirm.shipPay': 'Shipping & Payment',
    'confirm.discount': 'Discount ({code})',
    'confirm.totalPaid': 'Total Paid / Due',
    'confirm.continue': 'Continue Shopping',
    'confirm.home': 'Back to Home',
  },
};

const CATEGORY_MAP_VI = {
  All: 'Tất cả',
  Audio: 'Âm thanh',
  Lighting: 'Đèn chiếu sáng',
  'Desk Hardware': 'Phụ kiện bàn',
  Timepieces: 'Đồng hồ để bàn',
};

const STOCK_MAP_VI = {
  'In Stock': 'Còn hàng',
  'Limited Run': 'Phiên bản giới hạn',
};

const FINISH_MAP_VI = {
  'Matte Charcoal': 'Đen nhám Than chì',
  'Raw Silver': 'Bạc nguyên bản',
  'Slate Obsidian': 'Xám đá Obsidian',
  'Obsidian / Silver': 'Đen Obsidian / Bạc',
  'Brushed Aluminum': 'Nhôm phay xước',
  'Slate Dial': 'Mặt số Xám đá',
  'Chalk White Dial': 'Mặt số Trắng phấn',
  'Titanium / Charcoal': 'Titan / Than chì',
  'Obsidian Black': 'Đen tuyền Obsidian',
  'Slate Gray': 'Xám đá',
  'Matte Black': 'Đen nhám',
  'Dark Bronze': 'Đồng tối',
  'Brushed Steel': 'Thép phay xước',
};

const MATERIAL_MAP_VI = {
  'Anodized Aluminum': 'Nhôm Anodized',
  'Milled Aluminum': 'Nhôm phay CNC',
  'Machined Alloy': 'Hợp kim gia công',
  'Titanium & Leather': 'Titan & Da thật',
  'Anodized Slate': 'Nhôm Slate Anodized',
  'Borosilicate Glass': 'Thủy tinh Borosilicate',
};

const SPEC_KEY_MAP_VI = {
  Dimensions: 'Kích thước',
  Weight: 'Trọng lượng',
  Connectivity: 'Kết nối',
  Warranty: 'Bảo hành',
  Luminance: 'Độ sáng',
  'Color Temp': 'Nhiệt độ màu',
  Movement: 'Bộ máy',
  Crystal: 'Mặt kính',
  Battery: 'Pin',
  Driver: 'Màng loa',
  Output: 'Công suất sạc',
  Base: 'Chân đế',
  Protection: 'Chống nước / bụi',
};

const COUNTRY_MAP_VI = {
  'United States': 'Hoa Kỳ',
  Vietnam: 'Việt Nam',
  Canada: 'Canada',
  'United Kingdom': 'Vương quốc Anh',
  Germany: 'Đức',
  Japan: 'Nhật Bản',
};

const PRODUCT_I18N_VI = {
  'monolith-speaker': {
    name: 'Loa không dây Monolith M1',
    description:
      'Thân vỏ nhôm CNC nguyên khối với hai củ loa neodymium, hỗ trợ AirPlay 2, ngõ vào USB-C DAC không suy hao và triệt tiêu cộng hưởng.',
    specs: {
      Connectivity: 'Wi-Fi 6, Bluetooth 5.3, USB-C',
      Warranty: '2 năm Studio Care',
    },
  },
  'arc-desk-lamp': {
    name: 'Đèn bàn kiến trúc Arc Cantilever',
    description:
      'Đèn bàn đối trọng với quang học chống chói CRI 97+ và cảm ứng điều chỉnh độ sáng mượt mà từ 2700K đến 5000K.',
    specs: {
      Luminance: '850 lm (CRI 97+)',
      'Color Temp': '2700K - 5000K tùy chỉnh',
      Warranty: '2 năm Studio Care',
    },
  },
  'chrono-desk-clock': {
    name: 'Đồng hồ để bàn Chrono S2',
    description:
      'Gia công từ một khối nhôm 6061 nguyên khối cùng bộ máy quartz Thụy Sĩ kim trôi êm ái, kính sapphire và kim giây xanh cobalt.',
    specs: {
      Movement: 'Quartz Thụy Sĩ kim trôi',
      Crystal: 'Kính Sapphire chống lóa',
      Battery: 'Pin AA Lithium (36 tháng)',
    },
  },
  'studio-headphones': {
    name: 'Tai nghe kiểm âm Reference H1',
    description:
      'Tai nghe từ phẳng thiết kế đóng với gọng titan đàn hồi, đệm tai da cừu bọt nhớ và công nghệ chống ồn chủ động lai.',
    specs: {
      Driver: 'Màng loa từ phẳng 45mm',
      Battery: '42 giờ khi bật ANC',
      Warranty: '2 năm Studio Care',
    },
  },
  'modular-desk-dock': {
    name: 'Khay sạc để bàn Modular MagDock',
    description:
      'Khay để đồ trọng lượng nặng tích hợp sạc không dây từ tính Qi2 15W cùng các rãnh phay chính xác cho bút, chìa khóa và phụ kiện.',
    specs: {
      Output: 'Qi2 15W + Cổng USB-C',
      Base: 'Đệm silicone hút vi mô',
    },
  },
  'ambient-table-lantern': {
    name: 'Đèn lồng di động Lumen G3',
    description:
      'Đèn bàn sạc không dây kết hợp chao thủy tinh borosilicate mờ thổi thủ công với đế nhôm đồng tối và thời lượng pin 30 giờ.',
    specs: {
      Battery: '30 giờ (Sạc nhanh USB-C)',
      Protection: 'Chuẩn kháng nước bụi IP54',
      'Color Temp': '2400K ánh sáng ấm dịu',
    },
  },
};

export function getLang() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_LANG;
  }
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' || saved === 'vi' ? saved : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function setLang(lang) {
  const nextLang = lang === 'en' ? 'en' : 'vi';
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage error
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = nextLang;
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nova:lang-changed', { detail: { lang: nextLang } }));
  }
  return nextLang;
}

export function t(key, vars = {}, lang = getLang()) {
  const table = DICTIONARY[lang] || DICTIONARY[DEFAULT_LANG];
  let str = table[key] ?? DICTIONARY.en[key] ?? key;
  Object.entries(vars).forEach(([k, v]) => {
    str = str.replaceAll(`{${k}}`, String(v));
  });
  return str;
}

export function tCategory(category, lang = getLang()) {
  if (lang === 'en') return category;
  return CATEGORY_MAP_VI[category] || category;
}

export function tStockStatus(status, lang = getLang()) {
  if (lang === 'en') return status;
  return STOCK_MAP_VI[status] || status;
}

export function tFinish(finish, lang = getLang()) {
  if (lang === 'en') return finish;
  return FINISH_MAP_VI[finish] || finish;
}

export function tMaterial(material, lang = getLang()) {
  if (lang === 'en') return material;
  return MATERIAL_MAP_VI[material] || material;
}

export function tCountry(country, lang = getLang()) {
  if (lang === 'en') return country;
  return COUNTRY_MAP_VI[country] || country;
}

export function tProductName(product, lang = getLang()) {
  if (!product) return '';
  if (lang === 'vi' && PRODUCT_I18N_VI[product.id]) {
    return PRODUCT_I18N_VI[product.id].name;
  }
  return product.name;
}

export function tProductDescription(product, lang = getLang()) {
  if (!product) return '';
  if (lang === 'vi' && PRODUCT_I18N_VI[product.id]) {
    return PRODUCT_I18N_VI[product.id].description;
  }
  return product.description;
}

export function tProductSpecKey(key, lang = getLang()) {
  if (lang === 'en') return key;
  return SPEC_KEY_MAP_VI[key] || key;
}

export function tProductSpecValue(productId, key, val, lang = getLang()) {
  if (lang === 'en') return val;
  return PRODUCT_I18N_VI[productId]?.specs?.[key] || val;
}

export function tShippingLabel(methodId, lang = getLang()) {
  if (methodId === 'express') {
    return t('checkout.shipExpressTitle', {}, lang);
  }
  return t('checkout.shipStandardTitle', {}, lang);
}

export function tPaymentLabel(methodId, lang = getLang()) {
  if (methodId === 'cod') return t('checkout.payCodTitle', {}, lang);
  if (methodId === 'bank') return t('checkout.payBankTitle', {}, lang);
  return t('checkout.payCardTitle', {}, lang);
}

export function applyStaticTranslations(lang = getLang()) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;

  const pageKey = document.body?.dataset?.page;
  if (pageKey && DICTIONARY[lang]?.[`title.${pageKey}`]) {
    document.title = t(`title.${pageKey}`, {}, lang);
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key, {}, lang);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key, {}, lang));
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', t(key, {}, lang));
    }
  });
}

export const metadata = {
  title: "Terms & Conditions | Neon-K",
  description: "Legal terms and conditions for Neon-K ready-made neon wall art.",
};

export default function TermsEN() {
  return (
    <div className="min-h-screen">
      <nav className="flex items-center px-4 md:px-8 py-3 border-b border-border">
        <a href="/" className="text-sm text-neon-cyan hover:text-white transition-colors">
          ← Back to Store
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <p className="text-text-secondary/50 text-xs mb-1">EFFECTIVE DATE: JUNE 2026</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          TERMS AND CONDITIONS OF SERVICE
        </h1>
        <p className="text-text-secondary/60 text-sm mb-4">
          PLEASE READ THESE TERMS CAREFULLY. BY ACCESSING OR USING THIS WEBSITE, YOU
          ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY ALL OF
          THE TERMS AND CONDITIONS SET FORTH BELOW.
        </p>

        <hr className="border-border my-8" />

        {/* Section 1 */}
        <Section num="1" title="DEFINITIONS AND INTERPRETATION">
          <Item>
            &quot;Company,&quot; &quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot; refers to
            Neon-K, a commercial entity operating under the laws of the Kingdom of Saudi
            Arabia.
          </Item>
          <Item>
            &quot;Customer,&quot; &quot;You,&quot; or &quot;Your&quot; refers to any
            individual or entity that accesses or uses this Website or submits an Order.
          </Item>
          <Item>
            &quot;Website&quot; refers to the Neon-K online platform, accessible at its
            primary domain and any subdomains thereof.
          </Item>
          <Item>
            &quot;Product&quot; refers to any ready-made neon sign or wall art item
            offered for sale by the Company on the Website.
          </Item>
          <Item>
            &quot;Order&quot; refers to a confirmed purchase request submitted by a
            Customer via the Website, accompanied by proof of payment (receipt upload).
          </Item>
        </Section>

        {/* Section 2 */}
        <Section num="2" title="NATURE OF PRODUCTS — READY-MADE GOODS">
          <Item>
            ALL PRODUCTS SOLD THROUGH THIS WEBSITE ARE READY-MADE, PRE-MANUFACTURED
            GOODS. Each Product is held in inventory and shipped as-is. No Product is
            custom-manufactured or personalized for individual Customers.
          </Item>
          <Item>
            Product images on the Website are for illustration purposes. Minor variations
            in color, brightness, or finish may occur due to manufacturing tolerances and
            do not constitute a defect.
          </Item>
          <Item>
            Pursuant to the Saudi E-Commerce Law (Royal Decree No. M/126), the Customer
            has the right to return a Product within SEVEN (7) DAYS of receipt, provided
            the Product is in its original condition and original packaging.
          </Item>
        </Section>

        {/* Section 3 */}
        <Section num="3" title="ORDERS AND PAYMENT">
          <Item>
            All Orders require FULL PRE-PAYMENT via bank transfer or STC Pay. Payment
            details (IBAN and STC Pay number) are provided on the checkout page.
          </Item>
          <Item>
            The Customer must upload a clear image of the payment receipt to complete
            the Order. The Company will verify the receipt before processing the Order.
          </Item>
          <Item>
            An Order is considered CONFIRMED only after the Company verifies the payment
            receipt. Until verification, the Order remains pending.
          </Item>
          <Item>
            Prices displayed on the Website are in Saudi Riyals (SAR). The Company
            reserves the right to modify prices at any time without prior notice. The
            price applicable to an Order is the price displayed at the time of Order
            submission.
          </Item>
        </Section>

        {/* Section 4 */}
        <Section num="4" title="CANCELLATION AND RETURNS">
          <Item>
            The Customer may cancel an Order within TWO (2) HOURS of submission. After
            this period, cancellation may not be possible if the Order has been shipped.
          </Item>
          <Item>
            The Customer may return a Product within SEVEN (7) DAYS of receipt, provided:
            (a) the Product is in its original, unused condition; (b) the Product is in
            its original packaging; (c) the Customer bears the return shipping costs.
          </Item>
          <Item>
            Custom or personalized Products are not offered by the Company. All Products
            are standard, ready-made items.
          </Item>
        </Section>

        {/* Section 5 */}
        <Section num="5" title="LIMITED WARRANTY — MANUFACTURING DEFECTS">
          <Item>
            The Company provides a LIMITED WARRANTY against manufacturing defects for a
            period of SEVEN (7) DAYS from the date of delivery.
          </Item>
          <Item>
            &quot;Manufacturing defect&quot; is defined as: (a) malfunction of LED
            lighting components not caused by improper handling; (b) broken or warped
            frame upon delivery documented within 24 hours of receipt.
          </Item>
          <Item>
            THIS WARRANTY DOES NOT COVER: (a) damage caused by the Customer, including
            dropping, impact, improper mounting, or exposure to water or extreme
            temperatures; (b) Products that have been modified or repaired by any party
            other than the Company; (c) defects not reported within the 7-day period.
          </Item>
          <Item>
            The Customer&apos;s SOLE AND EXCLUSIVE REMEDY under this warranty shall be,
            at the Company&apos;s discretion: (a) replacement of the defective Product;
            or (b) refund. Liability shall not exceed the purchase price of the Product.
          </Item>
        </Section>

        {/* Section 6 */}
        <Section num="6" title="DATA PRIVACY">
          <Item>
            The Company collects personal data (name, phone, city, address) solely for
            the purpose of fulfilling Orders and providing customer support.
          </Item>
          <Item>
            Payment receipts are stored securely and used only for verification of
            payment. No credit card or bank account data is collected or stored.
          </Item>
          <Item>
            Customer data is retained for THIRTY (30) DAYS following delivery, after
            which it is permanently deleted. Customers may request earlier deletion by
            contacting the Company via WhatsApp or email.
          </Item>
        </Section>

        {/* Section 7 */}
        <Section num="7" title="INTELLECTUAL PROPERTY">
          <Item>
            All designs, logos, product images, and content on the Website are the
            exclusive intellectual property of the Company.
          </Item>
          <Item>
            The Customer may not copy, reproduce, distribute, or create derivative works
            from any content on the Website without the Company&apos;s express written
            permission.
          </Item>
        </Section>

        {/* Section 8 */}
        <Section num="8" title="SHIPPING AND DELIVERY">
          <Item>
            The Company offers FREE SHIPPING on all Orders within the Kingdom of Saudi
            Arabia. International shipping is not currently available.
          </Item>
          <Item>
            Estimated delivery time is THREE TO FIVE (3-5) BUSINESS DAYS from Order
            confirmation. This is an estimate and not a guaranteed delivery date.
          </Item>
          <Item>
            The Company shall not be liable for delivery delays caused by circumstances
            beyond its reasonable control, including force majeure events, carrier
            disruptions, or incorrect delivery information provided by the Customer.
          </Item>
        </Section>

        {/* Section 9 */}
        <Section num="9" title="LIMITATION OF LIABILITY">
          <Item className="text-yellow-400 font-bold text-base pb-2">
            PLEASE READ THIS SECTION CAREFULLY — IT LIMITS THE COMPANY&apos;S LIABILITY.
          </Item>
          <Item>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.
          </Item>
          <Item>
            THE COMPANY&apos;S TOTAL AGGREGATE LIABILITY FOR ANY CLAIMS SHALL NOT EXCEED
            THE TOTAL AMOUNT PAID BY THE CUSTOMER FOR THE SPECIFIC PRODUCT AT ISSUE.
          </Item>
          <Item>
            THE WEBSITE AND PRODUCTS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND.
          </Item>
        </Section>

        {/* Section 10 */}
        <Section num="10" title="GOVERNING LAW">
          <Item>
            These Terms shall be governed by and construed in accordance with the laws
            of the Kingdom of Saudi Arabia.
          </Item>
          <Item>
            Any dispute arising out of or relating to these Terms shall be subject to the
            EXCLUSIVE JURISDICTION of the competent courts in the Kingdom of Saudi Arabia.
          </Item>
        </Section>

        {/* Section 11 */}
        <Section num="11" title="MISCELLANEOUS">
          <Item>
            <strong>Severability.</strong> If any provision is found invalid, the
            remaining provisions shall remain in full force.
          </Item>
          <Item>
            <strong>Modification.</strong> The Company reserves the right to modify these
            Terms at any time. Continued use of the Website constitutes acceptance.
          </Item>
          <Item>
            <strong>Language.</strong> These Terms are drafted in English. In case of
            conflict with any translation, the English version shall prevail.
          </Item>
        </Section>

        {/* Contact */}
        <hr className="border-border my-10" />
        <div className="text-center text-sm text-text-secondary/60">
          <p>Questions regarding these Terms should be directed to:</p>
          <p className="mt-1">
            WhatsApp: +966 58 119 4038 &nbsp;|&nbsp; Email: nneon.kk@gmail.com
          </p>
          <p className="mt-6 text-xs text-text-secondary/40">
            © {new Date().getFullYear()} Neon-K. ALL RIGHTS RESERVED.
          </p>
        </div>
      </main>
    </div>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold mb-4 pb-2 border-b border-border/50">
        <span className="text-neon-cyan/70 text-sm mr-2">{num}.</span>
        {title}
      </h2>
      <div className="space-y-3 text-text-secondary text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Item({
  children,
  className,
  indent,
}: {
  children: React.ReactNode;
  className?: string;
  indent?: boolean;
}) {
  return (
    <p className={`${indent ? "ml-6" : ""} ${className ?? ""}`}>
      {children}
    </p>
  );
}

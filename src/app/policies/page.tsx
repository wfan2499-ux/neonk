export const metadata = {
  title: "السياسات | Neon-K",
  description: "سياسة الخصوصية، الإسترجاع، الشحن، الدفع، وشروط الخدمة",
};

export default function PoliciesPage() {
  return (
    <div className="min-h-[100dvh]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-border">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Neon-K" className="h-8 w-auto" />
        </a>
        <a
          href="/"
          className="px-4 py-2 rounded-full border border-border text-sm hover:bg-surface-hover transition-colors"
        >
          العودة للمتجر
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          السياسات <span className="gradient-text">والأحكام</span>
        </h1>
        <p className="text-text-secondary mb-12">آخر تحديث: يونيو ٢٠٢٦</p>

        {/* How it works */}
        <PolicySection id="how" title="كيف نعمل؟">
          <PolicyItem title="منتجات جاهزة">
            جميع تصاميمنا منتجات جاهزة ومصنعة مسبقاً بجودة عالية — اختر التصميم، ادفع، ويوصلك. ما تحتاج ترفع صور ولا تنتظر تصنيع.
          </PolicyItem>
          <PolicyItem title="مدة التوصيل">
            منتجك يوصلك <strong>بسرعة داخل المملكة العربية السعودية</strong> بدون انتظار شحن دولي. مدة التوصيل من ٣-٥ أيام عمل.
          </PolicyItem>
        </PolicySection>

        {/* Payment */}
        <PolicySection id="payment" title="الدفع">
          <div className="neon-border rounded-xl p-5 mb-6 border-neon-cyan/20 bg-neon-cyan/[0.02]">
            <p className="text-sm leading-relaxed">
              <strong className="text-neon-cyan">تحويل بنكي أو STC Pay:</strong> حول
              المبلغ على حسابنا، ارفع صورة الإيصال، ونشحن طلبك. جميع الطلبات مدفوعة
              مقدماً.
            </p>
          </div>
          <PolicyItem title="طرق الدفع المتاحة">
            <strong>تحويل بنكي</strong> على رقم الآيبان الموجود في صفحة إتمام الطلب، أو <strong>STC Pay</strong> على الرقم 0581194038.
          </PolicyItem>
          <PolicyItem title="تأكيد الدفع">
            بعد التحويل، ارفع صورة الإيصال في صفحة إتمام الطلب. يتم تأكيد طلبك وبدء تجهيز الشحن فور التحقق من الإيصال.
          </PolicyItem>
          <PolicyItem title="الخصوصية المالية">
            لا نخزن أي بيانات بنكية أو بطاقات. الإيصال يستخدم لمرة واحدة لتأكيد التحويل فقط.
          </PolicyItem>
        </PolicySection>

        {/* Privacy */}
        <PolicySection id="privacy" title="سياسة الخصوصية">
          <PolicyItem title="جمع المعلومات">
            نقوم بجمع المعلومات التالية: الاسم، رقم الجوال، المدينة، والعنوان لغرض التوصيل فقط.
          </PolicyItem>
          <PolicyItem title="استخدام البيانات">
            بياناتك تستخدم <strong>حصرياً</strong> لغرض توصيل طلبك والتواصل معك بخصوصه. لا نشارك بياناتك مع أي طرف ثالث.
          </PolicyItem>
          <PolicyItem title="حذف البيانات">
            يتم حذف جميع البيانات الشخصية من أنظمتنا بعد <strong>٣٠ يوماً</strong> من تاريخ تسليم الطلب. يمكنك طلب حذف بياناتك فوراً عبر الواتساب.
          </PolicyItem>
          <PolicyItem title="حماية البيانات">
            نستخدم إجراءات أمنية لحماية بياناتك. الإيصالات تخزن على خوادم آمنة ولا يمكن الوصول إليها إلا من قبل فريقنا.
          </PolicyItem>
        </PolicySection>

        {/* Returns */}
        <PolicySection id="returns" title="الإسترجاع والضمان">
          <div className="neon-border rounded-xl p-5 mb-6 border-neon-cyan/20 bg-neon-cyan/[0.02]">
            <p className="text-sm leading-relaxed">
              <strong className="text-neon-cyan">منتجات إلكترونية جاهزة:</strong> جميع
              لوحات النيون منتجات إلكترونية جاهزة. حسب نظام التجارة الإلكترونية السعودي،
              لك حق استرجاع المنتج <strong>خلال ٧ أيام</strong> من الاستلام بشرط أن
              يكون بحالته الأصلية وبتغليفه الأصلي.
            </p>
          </div>
          <PolicyItem title="الضمان على العيوب المصنعية">
            إذا استلمت لوحة وفيها عيب مصنعي (خلل في الإضاءة، إطار متضرر)، نستبدلها لك مجاناً خلال <strong>٧ أيام</strong> من تاريخ الاستلام. صور العيب وأرسله لنا على الواتساب.
          </PolicyItem>
          <PolicyItem title="غير مشمول بالضمان">
            التلف الناتج عن سوء الاستخدام، السقوط، التركيب الخاطئ، أو التعرض المباشر للماء والرطوبة العالية.
          </PolicyItem>
        </PolicySection>

        {/* Shipping */}
        <PolicySection id="shipping" title="الشحن والتوصيل">
          <PolicyItem title="مدة التوصيل">
            <strong>٣-٥ أيام عمل</strong> من تاريخ تأكيد الطلب واستلام الإيصال. نوفر لك رقم تتبع شحنتك فور صدوره.
          </PolicyItem>
          <PolicyItem title="رسوم الشحن">
            <strong className="text-neon-cyan">الشحن مجاني</strong> على جميع الطلبات ولكل مناطق المملكة العربية السعودية.
          </PolicyItem>
          <PolicyItem title="جهة الشحن">
            نتعامل مع شركات شحن موثوقة داخل المملكة لضمان وصول طلبك بأمان وسرعة.
          </PolicyItem>
          <PolicyItem title="التلف أثناء الشحن">
            إذا وصلتك اللوحة متضررة بسبب الشحن، <strong>نستبدلها لك مجاناً</strong>. صور الضرر فور استلامك وأرسله لنا خلال ٢٤ ساعة.
          </PolicyItem>
        </PolicySection>

        {/* Terms */}
        <PolicySection id="terms" title="شروط الخدمة">
          <PolicyItem title="الطلب والتأكيد">
            يتم تأكيد الطلب بعد استلام صورة إيصال التحويل. يبدأ تجهيز الشحن بعد التأكيد.
          </PolicyItem>
          <PolicyItem title="الإلغاء">
            يمكنك إلغاء طلبك <strong>خلال ساعتين</strong> من تأكيد الطلب. بعد بدء تجهيز الشحن، لا يمكن الإلغاء.
          </PolicyItem>
          <PolicyItem title="الأسعار">
            الأسعار قابلة للتغيير بدون إشعار مسبق. السعر المعتمد هو السعر المعروض وقت تقديم الطلب.
          </PolicyItem>
        </PolicySection>

        {/* Legal link */}
        <div className="mt-10 p-5 rounded-xl border border-white/5 text-center">
          <p className="text-text-secondary/60 text-xs mb-2">
            للاطلاع على الشروط القانونية الكاملة
          </p>
          <a
            href="/terms-en"
            className="text-neon-cyan/70 text-sm underline underline-offset-2 hover:text-neon-cyan transition-colors"
          >
            Terms &amp; Conditions (English)
          </a>
        </div>

        {/* Contact */}
        <div className="mt-8 p-6 rounded-2xl neon-card text-center">
          <h3 className="text-lg font-bold mb-2">عندك استفسار عن السياسات؟</h3>
          <p className="text-text-secondary text-sm mb-4">تواصل معنا على الواتساب أو الإيميل</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a
              href="https://wa.me/966581194038"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#1da851] transition-colors"
            >
              واتساب: +966 58 119 4038
            </a>
            <a
              href="mailto:nneon.kk@gmail.com"
              className="px-5 py-2.5 rounded-full border border-border font-bold hover:bg-surface-hover transition-colors"
            >
              nneon.kk@gmail.com
            </a>
          </div>
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-border text-center">
        <p className="text-xs text-text-secondary/50">
          © 2026 Neon-K. جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-5 pb-3 border-b border-border">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function PolicyItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold mb-1.5">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{children}</p>
    </div>
  );
}

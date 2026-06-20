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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* How it works - quick overview for customers */}
        <PolicySection id="how" title="كيف نعمل؟">
          <PolicyItem title="خطوات الطلب">
            تصفح التصاميم الأربعة ← اختر التصميم اللي يعجبك ← أرسل صورتك عبر واتساب ← نصنع لوحتك ← تستلمها لباب بيتك! العملية بسيطة وسريعة.
          </PolicyItem>
          <PolicyItem title="مدة التصنيع والتوصيل">
            نصنع لوحتك بعناية ونشحنها لك <strong>مجاناً</strong> خلال <strong>٣-٥ أيام عمل</strong>.
          </PolicyItem>
        </PolicySection>

        {/* Payment - new section */}
        <PolicySection id="payment" title="الدفع">
          <div className="neon-border rounded-xl p-5 mb-6 border-neon-lime/20 bg-neon-lime/[0.02]">
            <p className="text-sm leading-relaxed">
              <strong className="text-neon-lime">الدفع عند الاستلام:</strong> جميع طلباتنا
              بنظام الدفع عند الاستلام (Cash on Delivery). تدفع المبلغ كامل وقت استلام
              لوحتك — بدون دفع مقدماً وبدون بطاقات ائتمانية.
            </p>
          </div>
          <PolicyItem title="طريقة الدفع">
            <strong className="text-neon-lime">نقداً عند باب بيتك</strong> عند استلام الشحنة. المندوب يستلم المبلغ وتسلمك لوحتك.
          </PolicyItem>
          <PolicyItem title="ما المبلغ اللي لازم يتوفر؟">
            المبلغ الكامل المتفق عليه عند تأكيد الطلب. الأسعار تختلف حسب التصميم والمقاس — تتفق معنا عالسعر قبل نبدأ التصنيع.
          </PolicyItem>
          <PolicyItem title="الخصوصية">
            لا نجمع أي بيانات دفع ولا بطاقات ولا حسابات بنكية لأنك تدفع عند الاستلام فقط.
          </PolicyItem>
        </PolicySection>

        {/* Privacy */}
        <PolicySection id="privacy" title="سياسة الخصوصية">
          <PolicyItem title="جمع المعلومات">
            نقوم بجمع المعلومات التالية: الاسم، رقم الجوال، والعنوان لغرض التوصيل. الصور المرفوعة من قبل العميل تستخدم لغرض التصنيع فقط.
          </PolicyItem>
          <PolicyItem title="استخدام الصور">
            الصور التي ترفعها تستخدم <strong>حصرياً</strong> لغرض طباعة وتصنيع لوحتك الجدارية. لا نشارك صورك مع أي طرف ثالث. لا نستخدم صورك في التسويق أو العرض بدون إذنك الصريح.
          </PolicyItem>
          <PolicyItem title="حذف البيانات">
            يتم حذف جميع الصور والبيانات الشخصية من أنظمتنا بعد <strong>٣٠ يوماً</strong> من تاريخ تسليم الطلب. يمكنك طلب حذف بياناتك فوراً في أي وقت عبر الواتساب.
          </PolicyItem>
          <PolicyItem title="حماية البيانات">
            نستخدم إجراءات أمنية معقولة لحماية بياناتك. الصور تخزن على خوادم آمنة ولا يمكن الوصول إليها إلا من قبل فريق التصنيع.
          </PolicyItem>
        </PolicySection>

        {/* Returns */}
        <PolicySection id="returns" title="الإسترجاع والضمان">
          <div className="neon-border rounded-xl p-5 mb-6 border-neon-cyan/20 bg-neon-cyan/[0.02]">
            <p className="text-sm leading-relaxed">
              <strong className="text-neon-cyan">منتج مخصص حسب الطلب:</strong> جميع لوحاتنا
              تُصنع خصيصاً لك وتحمل صورتك الشخصية. لذلك، وحسب نظام التجارة الإلكترونية السعودي،{" "}
              <strong>لا يمكن استرجاع أو استبدال المنتجات المخصصة</strong> إلا في حال وجود
              عيب مصنعي.
            </p>
          </div>
          <PolicyItem title="الضمان على العيوب المصنعية">
            إذا استلمت لوحة وفيها عيب مصنعي (تشقق، تقشير، خلل في الإضاءة للوحة النيون، إطار مكسور)، نستبدلها لك مجاناً خلال <strong>٧ أيام</strong> من تاريخ الاستلام. فقط صور العيب وأرسله لنا على الواتساب.
          </PolicyItem>
          <PolicyItem title="غير مشمول بالضمان">
            التلف الناتج عن سوء الاستخدام، السقوط، التركيب الخاطئ، أو التعرض المباشر للماء والرطوبة العالية. تغير لون الصورة مع مرور الوقت (طبيعي في جميع المطبوعات).
          </PolicyItem>
        </PolicySection>

        {/* Shipping */}
        <PolicySection id="shipping" title="الشحن والتوصيل">
          <PolicyItem title="مدة التوصيل">
            <strong>٣-٥ أيام عمل</strong> من تاريخ استلام الصورة وتأكيد الطلب. في حال وجود تأخير غير متوقع، نتواصل معك فوراً.
          </PolicyItem>
          <PolicyItem title="رسوم الشحن">
            <strong className="text-neon-lime">الشحن مجاني</strong> على جميع الطلبات ولكل مناطق المملكة العربية السعودية.
          </PolicyItem>
          <PolicyItem title="جهة الشحن">
            نتعامل مع شركات شحن موثوقة. نوفر لك رقم تتبع شحنتك فور صدوره.
          </PolicyItem>
          <PolicyItem title="التلف أثناء الشحن">
            إذا وصلتك اللوحة متضررة بسبب الشحن، <strong>نستبدلها لك مجاناً</strong>. صور الضرر فور استلامك وأرسله لنا خلال ٢٤ ساعة.
          </PolicyItem>
        </PolicySection>

        {/* Terms */}
        <PolicySection id="terms" title="شروط الخدمة">
          <PolicyItem title="الطلب والتأكيد">
            يتم تأكيد الطلب بعد استلام الصورة والموافقة على التصميم عبر الواتساب. يبدأ التصنيع بعد التأكيد.
          </PolicyItem>
          <PolicyItem title="الإلغاء">
            يمكنك إلغاء طلبك <strong>خلال ساعتين</strong> من تأكيد الطلب وقبل بدء التصنيع. بعد بدء التصنيع، لا يمكن الإلغاء لأن المنتج مخصص.
          </PolicyItem>
          <PolicyItem title="المحتوى">
            نحتفظ بالحق في رفض أي صورة تحتوي على محتوى مخالف للقوانين السعودية أو مسيء أو غير لائق. في هذه الحالة يتم إبلاغك وإلغاء الطلب.
          </PolicyItem>
          <PolicyItem title="حقوق الملكية">
            أنت تقر بأنك تملك حقوق الصورة المرفوعة أو لديك إذن باستخدامها. Neon-K غير مسؤولة عن أي مخالفات حقوق ملكية فكرية.
          </PolicyItem>
          <PolicyItem title="الأسعار">
            الأسعار قابلة للتغيير بدون إشعار مسبق. السعر المعتمد هو السعر المتفق عليه عند تأكيد الطلب.
          </PolicyItem>
        </PolicySection>

        {/* Legal link to English terms */}
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
              واتساب: <span dir="ltr">+966 58 119 4038</span>
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

      {/* Footer */}
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

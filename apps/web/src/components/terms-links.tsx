import Link from 'next/link';
import React from 'react';

interface LinkProps {
  chunks: React.ReactNode;
}

export const PrivacyPolicyLink = ({ chunks }: LinkProps) => (
  <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
    {chunks}
  </Link>
);

export const CookieUseLink = ({ chunks }: LinkProps) => (
  <Link href="/cookies" className="underline underline-offset-4 hover:text-primary">
    {chunks}
  </Link>
);

interface TermsLinksProps {
  t: any;
}

const TermsLinks = ({ t }: TermsLinksProps) => (
  <>
    {t.rich('bySigningUp', {
      termsOfService: (chunks: React.ReactNode) => (
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          {chunks}
        </Link>
      ),
      privacyPolicy: (chunks: React.ReactNode) => (
        <PrivacyPolicyLink chunks={chunks} />
      ),
      cookieUse: (chunks: React.ReactNode) => (
        <CookieUseLink chunks={chunks} />
      )
    })}
  </>
);

export default TermsLinks;

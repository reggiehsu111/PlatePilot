'use client'

const TermsOfUse: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-2">
        <strong className="font-semibold">Last updated:</strong> Nov 18, 2023
      </p>
      <p className="mb-4">
        This document outlines the terms of use for plate-pilot, inspired
        by various standard terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms:</h2>
      <p className="mb-4">
        By accessing or using this website/platform/app (&quot;Service&quot;), you agree
        to be bound by these Terms of Use.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Changes to Terms:</h2>
      <p className="mb-4">
        We reserve the right to modify or replace these Terms at any time. It is
        your responsibility to check the Terms periodically for changes.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        3. Registration and Account Security:
      </h2>
      <div className="pl-5 mb-4">
        <p className="mb-1">
          <strong className="font-semibold">a.</strong> Users may be asked to
          register for an account. Provide accurate, current, and complete
          information.
        </p>
        <p className="mb-1">
          <strong className="font-semibold">b.</strong> Maintain the security of
          your password.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">4. User Conduct:</h2>
      <p className="mb-4">
        You agree not to use the Service for unlawful, harmful, threatening
        activities, or to impersonate any person or entity.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Content Responsibility:</h2>
      <p className="mb-4">
        You understand that all information posted or transmitted on the Service
        is the responsibility of the person from whom such content originated.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        6. Limitation of Liability:
      </h2>
      <p className="mb-4">
        In no event shall we be liable for any indirect, incidental, special,
        consequential or punitive damages, or any loss of profits or revenues.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Governing Law:</h2>
      <p className="mb-4">
        These Terms are governed by and construed in accordance with the laws of
        Michigan state.
      </p>

      <p className="mb-4">
        For inquiries or concerns regarding these terms, email
        <a
          href="mailto:liuyiche@umich.edu"
          className="text-blue-500 underline ml-1"
        >
          liuyiche@umich.edu
        </a>{' '}
        .
      </p>
    </div>
  )
}

export default TermsOfUse

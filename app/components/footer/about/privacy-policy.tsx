'use client'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-2">
        <strong className="font-semibold">Last updated:</strong> Nov 18, 2023
      </p>
      <p className="mb-4">
        This document outlines the privacy practices for plate-pilot,
        inspired by various standard terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">Updates:</h2>
      <p className="mb-4">
        Changes to this policy will be announced via our main webpage.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Data Collection:</h2>
      <div className="pl-5 mb-4">
        <p className="mb-1">
          <strong className="font-semibold">a.</strong> Directly from you:
          Registration, and other interactions.
        </p>
        <p className="mb-1">
          <strong className="font-semibold">b.</strong> From third parties: Data
          can be integrated from social media to enhance our services.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">2. Usage of Information:</h2>
      <p className="mb-4">
        Purpose includes verification, connection, maintaining a safe
        environment, service improvement, etc.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Data Sharing:</h2>
      <p className="mb-4">
        Data is shared under various circumstances including public posts,
        third-party service providers (social login).
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Data Security:</h2>
      <p className="mb-4">
        Measures are taken to protect your information. No data is shared with
        third parties.
      </p>

      <p className="mb-4">
        This policy was drafted with reference to various standard terms. For
        inquiries, email
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

export default PrivacyPolicy


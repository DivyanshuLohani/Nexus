export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white text-black px-6 py-20">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-4xl font-bold mb-6">
                    Privacy Policy
                </h1>

                <p className="text-sm text-gray-500 mb-10">
                    Last updated: 20 April 2026
                </p>

                <div className="space-y-8 text-sm leading-relaxed text-gray-700">

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            1. Information We Collect
                        </h2>
                        <p>
                            We collect basic account information such as your email,
                            username, and profile data when you create an account.
                            We may also collect usage data such as page views and interactions.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            2. How We Use Information
                        </h2>
                        <p>
                            Your information is used to provide and improve the service,
                            personalize your experience, and analyze usage trends.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            3. Analytics
                        </h2>
                        <p>
                            We collect anonymized analytics such as page views,
                            device type, and referrer data to help improve the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            4. Data Sharing
                        </h2>
                        <p>
                            We do not sell your personal data. We may share limited data
                            with third-party services strictly for infrastructure and analytics.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            5. Security
                        </h2>
                        <p>
                            We take reasonable measures to protect your data,
                            but no system is completely secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-semibold text-black mb-2">
                            6. Contact
                        </h2>
                        <p>
                            If you have questions, contact us at support@Nexus.app
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}
// src/pages/TermsAndConditions.jsx

import { Link } from "react-router-dom";
import "./TermsAndConditions.css";

function TermsAndConditions() {
  return (
    <main className="legal-page">

      <div className="legal-container">

        {/* ================= HEADER ================= */}

        <header className="legal-header">

          <span className="legal-eyebrow">
            LEAP LEARNING
          </span>

          <h1>
            Terms &amp; Conditions
          </h1>

          <p>
            Terms &amp; Conditions for Students, Participants and Candidates
          </p>

        </header>


        {/* ================= CONTENT ================= */}

        <div className="legal-content">

          <section className="legal-section">

            <h2>1. Introduction</h2>

            <p>
              These Terms &amp; Conditions (“Terms”) govern the relationship
              between <strong>Leap Learning</strong> (“Leap Learning”,
              “Company”, “we”, “us” or “our”) and any individual who makes
              an enquiry, registers, applies, enrolls, participates in, or
              otherwise avails of any educational, academic, professional,
              consultancy, admission-support or related program/service
              offered or facilitated by Leap Learning (“Candidate”,
              “Student”, “Participant”, “you” or “your”).
            </p>

            <p>
              By submitting an enquiry, application, registration, making
              payment, accepting an offer, or participating in a program/
              service facilitated by Leap Learning, you acknowledge that
              you have read, understood and agreed to these Terms, along
              with the applicable program-specific terms, fee structure,
              policies and other documents communicated to you.
            </p>

          </section>


          <section className="legal-section">

            <h2>2. Scope of Services</h2>

            <p>
              Leap Learning provides educational consultancy, admission
              assistance, academic coordination and related support
              services for programs offered or facilitated through its
              associated universities, institutions, academic partners
              or other service providers.
            </p>

            <p>
              The exact scope of services shall depend upon the program
              selected by the Candidate and the applicable terms
              communicated at the time of enrollment.
            </p>

            <p>
              Leap Learning may modify, update, suspend or discontinue
              any service or program where reasonably required due to
              changes in academic, regulatory, institutional, operational
              or business requirements, subject to applicable law and the
              terms applicable to the Candidate.
            </p>

          </section>


          <section className="legal-section">

            <h2>3. Program and University/Institution Relationship</h2>

            <p>
              Where a program is offered by, awarded by, or academically
              administered by a university or institution, the applicable
              university/institution shall remain responsible for matters
              falling within its academic and statutory authority,
              including, where applicable:
            </p>

            <ul>
              <li>academic curriculum and requirements;</li>
              <li>academic supervision and evaluation;</li>
              <li>examination, assessment and progression;</li>
              <li>issuance of academic records, certificates or degrees;</li>
              <li>academic policies and regulations; and</li>
              <li>final admission, eligibility and academic decisions.</li>
            </ul>

            <p>
              Leap Learning may facilitate communication, admission
              assistance, documentation, coordination and other support
              services, but does not replace the academic or statutory
              authority of the concerned university/institution.
            </p>

          </section>


          <section className="legal-section">

            <h2>4. Eligibility and Admission</h2>

            <p>
              Admission or participation shall be subject to the
              eligibility criteria, documentation requirements and
              academic policies applicable to the selected program.
            </p>

            <p>
              Leap Learning may assist the Candidate throughout the
              admission process; however, final admission approval
              remains subject to verification and acceptance by the
              concerned university/institution wherever applicable.
            </p>

            <p>
              Submission of an application or payment of any amount does
              not, by itself, guarantee admission, registration, academic
              progression, award of a qualification, scholarship or any
              particular academic outcome.
            </p>

          </section>


          <section className="legal-section">

            <h2>5. Accuracy of Information and Documents</h2>

            <p>
              The Candidate shall provide complete, accurate and authentic
              information and documents.
            </p>

            <p>
              The Candidate shall be responsible for ensuring that all
              academic certificates, identification documents, professional
              records, statements, declarations and other information
              submitted are genuine and accurate.
            </p>

            <p>
              If any information or document is found to be false,
              misleading, forged, materially incomplete or otherwise
              invalid, Leap Learning and/or the concerned university/
              institution may take appropriate action, including
              cancellation of the application, admission or services,
              subject to applicable law and institutional policy.
            </p>

          </section>


          <section className="legal-section">

            <h2>6. Fees and Payments</h2>

            <p>
              All applicable program fees, consultancy/service charges,
              university fees and other charges shall be communicated to
              the Candidate through the applicable fee structure, invoice,
              offer letter, admission communication or other official
              communication.
            </p>

            <p>
              The Candidate is responsible for making payments within
              the prescribed timelines.
            </p>

            <p>
              Payments must be made only through the payment methods or
              bank/payment details officially communicated by Leap Learning.
            </p>

            <p>
              Leap Learning shall not be responsible for payments made to
              unauthorized individuals, unofficial accounts, personal
              accounts or third parties unless expressly authorized by
              Leap Learning.
            </p>

          </section>


          <section className="legal-section">

            <h2>7. Fee Structure and Additional Charges</h2>

            <p>
              The applicable fee structure may differ depending on the
              selected program, university/institution, academic
              requirements, duration and services involved.
            </p>

            <p>
              Any additional academic, examination, administrative,
              documentation, travel, courier, statutory, university or
              other charges, where applicable, shall be payable as
              communicated by the concerned authority or under the
              applicable program terms.
            </p>

            <p>
              The Candidate should review the applicable fee structure
              before making payment.
            </p>

          </section>


          {/* =====================================================
              SECTION 8
              ===================================================== */}

          <section className="legal-section">

            <h2>
              8. Refund, Cancellation and Withdrawal
            </h2>

            <p>
              Refunds, cancellations and withdrawals shall be governed by
              the applicable{" "}
              <Link
                to="/refund-policy"
                className="legal-inline-link"
              >
                Refund &amp; Cancellation Policy
              </Link>{" "}
              communicated for the relevant program or service.
            </p>

            <p>
              Where fees have been paid directly to a university,
              institution or other third party, the refund shall be
              subject to the applicable policy of that entity.
            </p>

            <p>
              Leap Learning shall process any eligible refund attributable
              to Leap Learning in accordance with the applicable refund
              policy and applicable law.
            </p>

            <p>
              No refund shall be promised or implied unless the Candidate
              is entitled to such refund under the applicable terms or law.
            </p>

          </section>


          <section className="legal-section">

            <h2>9. Scholarships, Discounts and Promotional Offers</h2>

            <p>
              Any scholarship, discount, fee concession or promotional
              benefit offered by Leap Learning or communicated in relation
              to a program shall be subject to eligibility, profile
              evaluation, availability, applicable conditions and approval
              by the relevant authority, wherever applicable.
            </p>

            <p>
              A promotional communication or preliminary discussion shall
              not be treated as a final scholarship or fee concession
              unless confirmed through an official written communication.
            </p>

          </section>


          <section className="legal-section">

            <h2>10. No Guarantee of Academic or Professional Outcome</h2>

            <p>
              Leap Learning does not guarantee:
            </p>

            <ul>
              <li>successful admission in every case;</li>
              <li>completion of a program within a particular period;</li>
              <li>successful examination or assessment;</li>
              <li>
                award of a degree, diploma, certificate or other
                qualification;
              </li>
              <li>publication of academic work;</li>
              <li>
                employment, promotion, salary increase or professional
                advancement; or
              </li>
              <li>
                any specific academic or professional outcome,
              </li>
            </ul>

            <p>
              where such outcome depends upon the Candidate's eligibility,
              performance, university/institutional decision, academic
              requirements or other factors beyond Leap Learning's control.
            </p>

          </section>


          <section className="legal-section">

            <h2>11. Candidate Responsibilities</h2>

            <p>The Candidate shall:</p>

            <ol>
              <li>provide accurate information and genuine documents;</li>
              <li>
                comply with applicable university/institutional
                requirements;
              </li>
              <li>
                complete academic or administrative requirements within
                prescribed timelines;
              </li>
              <li>
                make applicable payments within the specified due dates;
              </li>
              <li>
                maintain professional and respectful communication with
                Leap Learning representatives and academic personnel;
              </li>
              <li>
                regularly review official communications sent through
                registered email, telephone, messaging services or other
                approved channels;
              </li>
              <li>
                protect login credentials and confidential information
                provided to them; and
              </li>
              <li>
                comply with applicable laws, academic regulations and
                institutional policies.
              </li>
            </ol>

          </section>


          <section className="legal-section">

            <h2>12. Communication and Official Information</h2>

            <p>
              Leap Learning may communicate with Candidates through
              registered email addresses, telephone numbers, SMS, WhatsApp,
              website notifications or other communication channels
              provided by the Candidate.
            </p>

            <p>
              The Candidate is responsible for keeping contact information
              accurate and accessible.
            </p>

            <p>
              Leap Learning shall not ordinarily be responsible for delays
              caused by incorrect contact details, inactive communication
              channels, failure to check communications or circumstances
              beyond its reasonable control.
            </p>

          </section>


          <section className="legal-section">

            <h2>13. Academic Integrity</h2>

            <p>
              Candidates are expected to maintain academic integrity and
              comply with applicable academic policies.
            </p>

            <p>
              Candidates shall not engage in plagiarism, fabrication,
              falsification, impersonation, cheating, submission of
              fraudulent documents or any other academic misconduct.
            </p>

            <p>
              Where academic misconduct is identified, the matter may be
              referred to the concerned university/institution for
              appropriate action in accordance with its applicable rules
              and applicable law.
            </p>

          </section>


          <section className="legal-section">

            <h2>14. Intellectual Property</h2>

            <p>
              Unless otherwise stated in writing, all website content,
              branding, logos, text, graphics, designs, documents,
              materials, software and other content provided by Leap
              Learning remain the property of Leap Learning or its
              respective licensors.
            </p>

            <p>
              Candidates shall not reproduce, distribute, modify,
              commercially exploit, publish or misuse such materials
              without prior written authorization, except where permitted
              by applicable law.
            </p>

          </section>


          <section className="legal-section">

            <h2>15. Personal Data and Privacy</h2>

            <p>
              Leap Learning may collect and process personal information
              provided by Candidates for legitimate purposes including
              enquiry management, admission processing, communication,
              documentation, academic coordination, payment processing,
              customer support, compliance and other purposes connected
              with the provision of services.
            </p>

            <p>
              Leap Learning shall handle personal data in accordance with
              applicable data-protection and privacy laws and its
              applicable Privacy Policy.
            </p>

            <p>
              Where personal information must be shared with a university,
              institution, service provider, payment processor or other
              relevant party for providing the requested service, such
              sharing shall be carried out in accordance with applicable
              law and the applicable privacy framework.
            </p>

            <p>
              The <strong>Digital Personal Data Protection Act, 2023</strong>
              establishes a framework concerning processing of digital
              personal data and protection of individuals' personal data.
            </p>

          </section>


          <section className="legal-section">

            <h2>16. Website and Technology Use</h2>

            <p>
              Candidates shall use the Leap Learning website, portals and
              digital services only for lawful purposes.
            </p>

            <p>Candidates shall not:</p>

            <ul>
              <li>attempt unauthorized access;</li>
              <li>interfere with website or system security;</li>
              <li>introduce malicious software or code;</li>
              <li>impersonate another person;</li>
              <li>misuse another person's account or credentials;</li>
              <li>
                copy or exploit website content without authorization; or
              </li>
              <li>
                use the Company's digital systems for unlawful or
                fraudulent activities.
              </li>
            </ul>

            <p>
              Applicable information-technology laws and rules may apply
              to the use of digital systems and online services.
            </p>

          </section>


          <section className="legal-section">

            <h2>17. Confidentiality</h2>

            <p>
              Candidates may receive confidential information relating to
              their application, academic records, login credentials, fee
              details, internal communications or other non-public
              information.
            </p>

            <p>
              Such information shall not be disclosed, transferred,
              published or misused without authorization, except where
              disclosure is required by law or permitted under applicable
              terms.
            </p>

          </section>


          <section className="legal-section">

            <h2>18. Third-Party Services and Institutions</h2>

            <p>
              Certain services may involve universities, institutions,
              payment gateways, technology providers, courier providers,
              academic platforms or other third parties.
            </p>

            <p>
              Where a third party is responsible for a particular service,
              its applicable terms, policies and procedures may also apply.
            </p>

            <p>
              Leap Learning may assist the Candidate in communicating or
              coordinating with such third parties but shall not be
              responsible for matters exclusively within the authority or
              control of the third party.
            </p>

          </section>


          <section className="legal-section">

            <h2>19. Service Delays and Events Beyond Reasonable Control</h2>

            <p>
              Leap Learning shall not be responsible for delays or
              interruptions caused by circumstances beyond its reasonable
              control, including changes in university policies,
              regulatory requirements, government directions, technical
              failures, internet or telecommunications disruptions,
              natural events, public emergencies, strikes, or other
              unforeseen circumstances.
            </p>

            <p>
              Leap Learning shall make reasonable efforts to communicate
              material delays or changes where practicable.
            </p>

          </section>


          <section className="legal-section">

            <h2>20. Suspension or Termination of Services</h2>

            <p>Leap Learning may suspend or discontinue services where:</p>

            <ul>
              <li>
                the Candidate provides false or misleading information;
              </li>
              <li>required payments remain unpaid;</li>
              <li>
                the Candidate materially breaches these Terms;
              </li>
              <li>
                the Candidate engages in unlawful, fraudulent, abusive or
                inappropriate conduct;
              </li>
              <li>
                continued service would violate applicable law or
                regulatory requirements; or
              </li>
              <li>
                the relevant program or service is discontinued or
                materially changed.
              </li>
            </ul>

            <p>
              Any such action shall remain subject to applicable law and
              the Candidate's contractual or statutory rights.
            </p>

          </section>


          <section className="legal-section">

            <h2>21. Limitation of Responsibility</h2>

            <p>
              Leap Learning shall provide its services with reasonable care
              and in accordance with the applicable terms.
            </p>

            <p>
              To the extent permitted by applicable law, Leap Learning
              shall not be responsible for losses arising solely from
              matters outside its reasonable control or from decisions
              made independently by a university, institution, government
              authority, examination body or other third party.
            </p>

            <p>
              Nothing in these Terms shall exclude or restrict any
              liability or consumer right that cannot lawfully be excluded
              or restricted under applicable Indian law.
            </p>

          </section>


          <section className="legal-section">

            <h2>22. Consumer Rights</h2>

            <p>
              Nothing in these Terms is intended to exclude, restrict or
              waive any mandatory rights or remedies available to a
              consumer under applicable Indian law.
            </p>

            <p>
              The Consumer Protection Act, 2019 provides a statutory
              framework for protection of consumer interests and
              settlement of consumer disputes.
            </p>

          </section>


          <section className="legal-section">

            <h2>23. Grievance and Complaint Resolution</h2>

            <p>
              Candidates may first raise any concern or complaint directly
              with Leap Learning through the official contact details
              published on the Company's website.
            </p>

            <p>
              Leap Learning shall make reasonable efforts to review and
              address legitimate complaints within a reasonable period,
              subject to the nature and complexity of the matter.
            </p>

            <p>
              Where a matter falls within the exclusive authority of a
              university, institution, statutory authority or other third
              party, the Candidate may also be required to follow the
              applicable grievance mechanism of that authority.
            </p>

          </section>


          <section className="legal-section">

            <h2>24. Modification of Terms</h2>

            <p>
              Leap Learning may update these Terms from time to time to
              reflect changes in applicable law, regulatory requirements,
              business operations, technology, services or institutional
              requirements.
            </p>

            <p>
              The updated version shall be published on the website with
              the applicable effective or updated date.
            </p>

            <p>
              Continued use of the Company's services after an applicable
              update may be subject to the revised Terms, to the extent
              permitted by law.
            </p>

          </section>


          <section className="legal-section">

            <h2>25. Governing Law</h2>

            <p>
              These Terms shall be governed by and interpreted in
              accordance with the <strong>laws of India</strong>, subject
              to applicable statutory and regulatory provisions.
            </p>

            <p>
              Nothing in these Terms shall prevent a consumer or other
              eligible person from exercising any mandatory legal right
              before a competent authority or forum under applicable law.
            </p>

          </section>


          <section className="legal-section">

            <h2>26. Jurisdiction</h2>

            <p>
              Subject to applicable law and any mandatory jurisdiction
              available to a consumer or other claimant, disputes arising
              in connection with these Terms or the services provided by
              Leap Learning shall be subject to the jurisdiction of the
              competent courts and authorities having jurisdiction over
              the Company's applicable place of business.
            </p>

          </section>


          <section className="legal-section">

            <h2>27. Severability</h2>

            <p>
              If any provision of these Terms is determined to be invalid,
              unlawful or unenforceable by a competent authority, such
              provision shall be modified or severed to the extent
              necessary, and the remaining provisions shall continue to
              the extent permitted by applicable law.
            </p>

          </section>


          <section className="legal-section">

            <h2>28. Entire Agreement</h2>

            <p>
              These Terms, together with the applicable program-specific
              terms, fee structure, admission/offer communication, refund
              policy, privacy policy and other documents expressly
              incorporated by reference, constitute the understanding
              applicable to the Candidate's relationship with Leap Learning
              concerning the relevant services.
            </p>

            <p>
              Where a specific written agreement or program-specific term
              conflicts with these general Terms, the specific applicable
              term shall prevail to the extent of the inconsistency,
              subject to applicable law.
            </p>

          </section>


          {/* ================= RELATED POLICY ================= */}

          <div className="legal-related-policy">

            <span>
              Related Policy
            </span>

            <Link to="/refund-policy">
              Refund &amp; Cancellation Policy
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default TermsAndConditions;
import { useEffect } from "react";
import { SafeHtml } from "@/components/SafeHtml";

interface LegalPageProps {
  type: "privacy" | "terms" | "acceptable-use";
  onNavigate: (page: string) => void;
}

export function LegalPage({ type, onNavigate }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [type]);

  const content = legalContent[type];

  return (
    <div className="pt-28 pb-20 px-[5vw]">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate("home")}
          className="text-sm font-body text-blue hover:underline mb-6 inline-block"
        >
          ← Back to Home
        </button>
        <h1 className="text-3xl md:text-5xl font-display mb-2">{content.title}</h1>
        <p className="text-sm font-body text-mid-grey mb-8">Effective Date: March 16, 2026</p>
        <div className="prose prose-slate max-w-none font-body text-foreground leading-relaxed legal-content">
          <SafeHtml html={content.html} />
        </div>
      </div>
    </div>
  );
}

const legalContent = {
  "privacy": {
    title: "Privacy Policy",
    html: `
<h2>Introduction</h2>
<p>Welcome to Classy ("we," "our," or "us"). We are committed to protecting the privacy of all users of our institutional communication and academic workflow platform. This Privacy Policy explains how we collect, use, store, and protect personal information, especially information about students under the age of 18.</p>
<p>Classy provides a platform used by educational institutes, teachers, parents, and students for educational purposes including announcements, assignments, attendance tracking, and parent-teacher communication.</p>
<p><strong>Important:</strong> Educational Institutes act as the Data Controller for all student information. Classy acts as a Data Processor, providing the platform infrastructure on behalf of educational institutes.</p>

<h2>1. Information We Collect</h2>
<h3>1.1 Student Information (Collected Through Educational Institutes)</h3>
<p>When an educational institute uses Classy, we may collect and process the following student information:</p>
<ul>
<li><strong>Personal Information:</strong> Student name, class/section, roll number, date of birth, student ID</li>
<li><strong>Academic Information:</strong> Assignment submissions, grades, exam scores, teacher remarks, attendance records</li>
<li><strong>Parent/Guardian Information:</strong> Parent names, email addresses, phone numbers, residential address</li>
<li><strong>Communication Data:</strong> Messages between teachers and parents, announcements, notifications</li>
<li><strong>Usage Data:</strong> Device information (type, operating system), IP address, browser type, app usage patterns, login times</li>
</ul>

<h3>1.2 Teacher and Institute Administrator Information</h3>
<ul>
<li>Name, email address, phone number, employee ID</li>
<li>Teaching assignments, class schedules</li>
<li>Communication and announcements created</li>
<li>Usage and activity data</li>
</ul>

<h3>1.3 Parent Information</h3>
<ul>
<li>Name, email address, phone number</li>
<li>Relationship to student</li>
<li>Communication history with teachers</li>
<li>App usage data</li>
</ul>

<h3>1.4 Automatically Collected Information</h3>
<ul>
<li>Device identifiers, IP addresses</li>
<li>Browser type and version</li>
<li>Pages visited, time spent on platform</li>
<li>Error logs and diagnostic information</li>
</ul>

<h2>2. How We Use Information</h2>
<h3>2.1 Educational Services</h3>
<p>We use the collected information solely to provide and improve our educational platform services:</p>
<ul>
<li>Facilitate communication between educational institutes, teachers, parents, and students</li>
<li>Enable assignment distribution and submission</li>
<li>Track and report attendance</li>
<li>Generate academic reports and progress updates</li>
<li>Send notifications and announcements</li>
<li>Provide dashboard analytics for institute administrators</li>
<li>Improve platform functionality and user experience</li>
</ul>

<h3>2.2 Legal Compliance</h3>
<p>We may use information to:</p>
<ul>
<li>Comply with legal obligations under Indian law</li>
<li>Respond to lawful requests from government authorities</li>
<li>Protect the rights, property, or safety of Classy, educational institutes, or users</li>
</ul>

<h2>3. How We Share Information</h2>
<h3>3.1 No Sale of Student Data</h3>
<p>We do not sell, rent, or trade student data or any personal information to third parties for marketing or advertising purposes. Ever.</p>

<h3>3.2 Sharing Within the Institutional Ecosystem</h3>
<p>Information is shared only as necessary for educational purposes:</p>
<ul>
<li><strong>Within Institutes:</strong> Student data is accessible to authorized institute administrators and teachers within the same educational institute</li>
<li><strong>With Parents:</strong> Parents can access their own child's information through the parent portal</li>
<li><strong>Between Teachers and Parents:</strong> Communication features enable direct messaging about the student</li>
</ul>

<h3>3.3 Service Providers</h3>
<p>We may share data with trusted third-party service providers who assist in operating our platform, such as:</p>
<ul>
<li>Cloud hosting providers (data storage)</li>
<li>Payment processors (for institute fee payments)</li>
<li>Email and SMS service providers (for notifications)</li>
<li>Analytics providers (for platform improvement)</li>
</ul>
<p>All service providers are contractually obligated to:</p>
<ul>
<li>Use data only for providing services to Classy</li>
<li>Implement appropriate security measures</li>
<li>Not use student data for their own purposes</li>
</ul>

<h3>3.4 Legal Requirements</h3>
<p>We may disclose information if required by law, such as:</p>
<ul>
<li>In response to court orders or legal process</li>
<li>To comply with government regulations</li>
<li>To protect against fraud or illegal activity</li>
<li>To protect the safety of users or the public</li>
</ul>

<h2>4. Data Ownership and Control</h2>
<h3>4.1 Educational Institutes as Data Controllers</h3>
<p>Educational Institutes own and control all student data. Classy acts only as a Data Processor on behalf of educational institutes.</p>
<p>This means:</p>
<ul>
<li>Educational Institutes determine what student data is collected</li>
<li>Educational Institutes are responsible for obtaining parental consent (see Section 5)</li>
<li>Educational Institutes can request export or deletion of their data at any time</li>
<li>Educational Institutes control which teachers and administrators have access to data</li>
</ul>

<h3>4.2 Parent Rights</h3>
<p>Parents have the following rights regarding their child's information:</p>
<ul>
<li><strong>Access:</strong> Request to view all information about their child</li>
<li><strong>Correction:</strong> Request correction of inaccurate information</li>
<li><strong>Deletion:</strong> Request deletion of their child's information (subject to educational institute's record-keeping obligations)</li>
<li><strong>Portability:</strong> Request a copy of their child's data in a portable format</li>
<li><strong>Objection:</strong> Object to certain types of data processing</li>
</ul>

<h2>5. Parental Consent for Student Accounts</h2>
<h3>5.1 Institutional Responsibility</h3>
<p>Students under 18 cannot create accounts independently. Educational Institutes are responsible for:</p>
<ul>
<li>Obtaining written parental consent before creating student accounts</li>
<li>Providing parents with this Privacy Policy</li>
<li>Obtaining parental approval for their child's use of Classy</li>
<li>Maintaining records of parental consent</li>
</ul>

<h3>5.2 Consent Requirements</h3>
<p>Before a student account is activated, educational institutes must obtain consent from parents/guardians acknowledging:</p>
<ul>
<li>The types of data that will be collected</li>
<li>How the data will be used</li>
<li>Who will have access to the data</li>
<li>Parent rights to access, correct, or delete data</li>
</ul>

<h2>6. Data Security</h2>
<p>We take the security of student information very seriously and implement industry-standard security measures:</p>
<h3>6.1 Technical Safeguards</h3>
<ul>
<li><strong>Encryption:</strong> All data is encrypted in transit (TLS/SSL) and at rest (AES-256)</li>
<li><strong>Access Controls:</strong> Role-based access ensures users see only authorized data</li>
<li><strong>Authentication:</strong> Secure login with password requirements and optional two-factor authentication</li>
<li><strong>Secure Infrastructure:</strong> Data hosted on secure servers with regular security audits</li>
<li><strong>Firewalls and Monitoring:</strong> Network security and intrusion detection systems</li>
</ul>

<h3>6.2 Organizational Safeguards</h3>
<ul>
<li>Employee background checks and training on data privacy</li>
<li>Strict access controls — employees access data only as needed for their role</li>
<li>Confidentiality agreements for all employees and contractors</li>
<li>Regular security assessments and updates</li>
<li>Incident response plan for data breaches</li>
</ul>

<h3>6.3 Data Breach Notification</h3>
<p>In the event of a data breach affecting student information, we will:</p>
<ul>
<li>Notify affected educational institutes within 72 hours</li>
<li>Provide details about the breach and data affected</li>
<li>Outline steps being taken to address the breach</li>
<li>Educational Institutes are responsible for notifying parents as required by law</li>
</ul>

<h2>7. Data Retention and Deletion</h2>
<h3>7.1 Retention Period</h3>
<ul>
<li><strong>Active Student Data:</strong> Retained while the student is enrolled and the educational institute's account is active</li>
<li><strong>Graduated Students:</strong> Educational Institutes may choose to retain data for alumni purposes or delete it</li>
<li><strong>Inactive Accounts:</strong> If a educational institute account becomes inactive, data is retained for 90 days then deleted</li>
</ul>

<h3>7.2 Deletion Process</h3>
<p>When an educational institute terminates their account:</p>
<ul>
<li>Educational Institutes receive a 30-day notice period to export all data</li>
<li>After 30 days, all institute data is permanently deleted from production systems</li>
<li>Backup data is deleted within 90 days</li>
</ul>
<p>When a parent requests deletion:</p>
<ul>
<li>Parent contacts the educational institute</li>
<li>Educational Institute verifies the request and approves deletion</li>
<li>Classy permanently deletes the student data within 30 days</li>
<li>Exception: Data may be retained if required by law or for legal proceedings</li>
</ul>

<h3>7.3 Data Export</h3>
<p>Educational Institutes can request a complete export of their data at any time in standard formats (CSV, JSON, PDF).</p>

<h2>8. Children's Privacy</h2>
<h3>8.1 Protection of Minors</h3>
<p>Classy is designed to protect the privacy of students, many of whom are minors under 18 years of age.</p>

<h3>8.2 Special Protections for Minors</h3>
<ul>
<li><strong>No Direct Marketing:</strong> We never use student data for marketing or advertising</li>
<li><strong>No Behavioral Tracking:</strong> We do not track students across websites or create advertising profiles</li>
<li><strong>Institute-Controlled Accounts:</strong> Students cannot sign up independently; educational institutes create and manage accounts</li>
<li><strong>Parental Access:</strong> Parents can access all information about their child</li>
<li><strong>Limited Data Collection:</strong> We collect only data necessary for educational purposes</li>
</ul>

<h3>8.3 Age Verification</h3>
<p>Educational Institutes are responsible for verifying student ages and obtaining appropriate parental consent for students under 18.</p>

<h2>9. Third-Party Links and Services</h2>
<p>The Classy platform may contain links to external websites or integrate with third-party educational tools. We are not responsible for:</p>
<ul>
<li>Privacy practices of third-party websites</li>
<li>Content on external sites</li>
<li>Third-party data collection</li>
</ul>
<p>We recommend educational institutes and parents review the privacy policies of any third-party services before use.</p>

<h2>10. International Data Transfers</h2>
<h3>10.1 Data Storage Location</h3>
<p>Student data is stored on secure servers located in India. However, some service providers may be located outside India.</p>
<h3>10.2 Cross-Border Transfers</h3>
<p>If data is transferred outside India, we ensure adequate data protection measures are in place and service providers comply with international privacy standards.</p>

<h2>11. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy periodically. When we make changes:</p>
<ul>
<li>We will update the "Last Updated" date at the top</li>
<li>Educational Institutes will be notified via email 30 days before changes take effect</li>
<li>Material changes will require renewed consent from educational institutes and parents</li>
<li>Continued use of Classy after changes constitutes acceptance</li>
</ul>

<h2>12. Your Rights Under Indian Law</h2>
<p>Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian laws, users have the following rights:</p>
<ul>
<li><strong>Right to Information:</strong> You have the right to know what personal data we collect and how it's used.</li>
<li><strong>Right to Access:</strong> You can request copies of personal data we hold about you or your child.</li>
<li><strong>Right to Correction:</strong> You can request correction of inaccurate or incomplete personal data.</li>
<li><strong>Right to Erasure:</strong> You can request deletion of personal data (subject to legal retention requirements).</li>
<li><strong>Right to Data Portability:</strong> You can request your data in a portable, machine-readable format.</li>
<li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time (may affect ability to use certain features).</li>
</ul>

<h2>13. Contact Us</h2>
<h3>13.1 For Educational Institutes and Parents</h3>
<p>Classy Privacy Team<br/>Email: legal@silverlynx.in<br/>Phone: +91-7603969398<br/>Address: Mogappair East, Chennai 37</p>
<p>Response Time: We will respond to all privacy requests within 30 days.</p>

<h3>13.2 Grievance Officer</h3>
<p>As required under Indian law, we have appointed a Grievance Officer to address complaints:</p>
<p>Name: Prabhakar<br/>Email: legal@silverlynx.in<br/>Phone: +91-7603969398</p>
<p>Grievances will be acknowledged within 24 hours and resolved within 30 days.</p>

<p><strong>By using Classy, educational institutes, teachers, parents, and students acknowledge that they have read, understood, and agree to this Privacy Policy.</strong></p>
`
  },
  "terms": {
    title: "Terms and Conditions",
    html: `
<h2>1. Introduction and Acceptance</h2>
<h3>1.1 Agreement to Terms</h3>
<p>These Terms and Conditions ("Terms") constitute a legally binding agreement between you and Classy ("we," "us," or "our") governing your use of the Classy platform, website, and mobile applications (collectively, the "Platform").</p>
<p>By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Platform.</p>

<h3>1.2 Who May Use the Platform</h3>
<ul>
<li><strong>Educational Institutes:</strong> Educational institutions that register for an institutional account</li>
<li><strong>Institute Administrators:</strong> Authorized personnel managing the educational institute's account</li>
<li><strong>Teachers:</strong> Educators authorized by the educational institute</li>
<li><strong>Parents/Guardians:</strong> Parents or legal guardians of students enrolled in participating educational institutes</li>
<li><strong>Students:</strong> Students enrolled in participating educational institutes (accounts managed by educational institutes/parents)</li>
</ul>

<h3>1.3 Students Under 18</h3>
<p>Students under 18 years of age cannot create accounts independently. Student accounts must be created and managed by the educational institute (with parental consent) or parents/guardians through the parent portal.</p>

<h2>2. Services Provided</h2>
<h3>2.1 Platform Features</h3>
<p>Classy provides an educational institute communication and academic workflow platform including:</p>
<ul>
<li>Attendance tracking and reporting</li>
<li>Assignment creation, distribution, and collection</li>
<li>Gradebook and academic record management</li>
<li>Parent-teacher communication tools</li>
<li>Institutional announcements and notifications</li>
<li>Student performance analytics</li>
<li>Timetable and schedule management</li>
</ul>

<h3>2.2 Service Availability</h3>
<p>We strive to maintain 99.5% uptime but do not guarantee uninterrupted access. The Platform may be temporarily unavailable due to scheduled maintenance, emergency maintenance, technical difficulties, or force majeure events.</p>

<h2>3. Account Registration and Management</h2>
<h3>3.1 Educational Institute Accounts</h3>
<p>To register a educational institute account:</p>
<ul>
<li>Provide accurate institute information (name, address, registration number)</li>
<li>Designate an authorized administrator</li>
<li>Accept these Terms and the Data Processing Agreement</li>
<li>Pay applicable subscription fees (if any)</li>
</ul>

<h3>3.2 Teacher and Administrator Accounts</h3>
<p>Teacher and administrator accounts are created and managed by the educational institute. Educational Institutes must verify identity, assign appropriate access levels, revoke access when staff leaves, and monitor account activity.</p>

<h3>3.3 Parent Accounts</h3>
<p>Parent accounts may be created by the educational institute (with parent consent) or parents themselves using a unique registration code provided by the educational institute.</p>

<h3>3.4 Student Accounts</h3>
<p>Student accounts are created and controlled by educational institutes after obtaining parental consent. Students may NOT create accounts independently (if under 18), access other students' information, modify their own attendance or grade records, or impersonate others.</p>

<h2>4. User Responsibilities and Conduct</h2>
<h3>4.1 Acceptable Use</h3>
<p>You agree to use the Platform only for lawful, educational purposes. Prohibited actions include:</p>
<ul>
<li>Upload false, inaccurate, or misleading information</li>
<li>Impersonate another person or entity</li>
<li>Harass, bully, threaten, or abuse others</li>
<li>Upload obscene, offensive, or inappropriate content</li>
<li>Share sexually explicit material involving minors</li>
<li>Promote violence, discrimination, or illegal activities</li>
<li>Violate intellectual property rights</li>
<li>Attempt to gain unauthorized access to systems or accounts</li>
<li>Use automated tools (bots, scrapers) without permission</li>
</ul>

<h3>4.2 Consequences of Violations</h3>
<p>Violation of these Terms may result in warning, temporary suspension, permanent termination, reporting to institutional authorities or law enforcement, or legal action for damages.</p>

<h2>5. Data Ownership and Intellectual Property</h2>
<h3>5.1 Ownership of User Data</h3>
<p>All student, teacher, and institute data inputted into the Platform remains the property of the educational institute. Classy acts only as a Data Processor and does NOT claim ownership of student academic records, attendance data, assignment submissions, parent-teacher communications, or any content created by users.</p>

<h3>5.2 License to Classy</h3>
<p>By using the Platform, educational institutes grant Classy a limited, non-exclusive license to store and process data solely to provide the Platform services, display data to authorized users, and generate aggregate anonymized analytics.</p>

<h3>5.3 Ownership of Platform</h3>
<p>Classy owns all rights to the Platform software, code, technology, design, features, trademarks, logos, and branding. Users may NOT copy, modify, reverse-engineer the Platform, create derivative works, sell or sublicense access, or remove proprietary notices.</p>

<h2>6. Payment Terms</h2>
<h3>6.1 Subscription Fees</h3>
<p>Educational Institutes may be required to pay subscription fees. Fees may be based on flat annual/monthly rate, per-student pricing, or tiered plans based on institute size.</p>

<h3>6.2 Payment Processing</h3>
<p>Payments are processed through secure third-party payment gateways. All fees are in Indian Rupees (INR) unless otherwise stated.</p>

<h3>6.3 Refund Policy</h3>
<p>Subscription fees are generally non-refundable. Exceptions include platform unavailability for more than 7 consecutive days due to Classy's fault, or Classy terminating the service without cause.</p>

<h2>7. Privacy and Data Protection</h2>
<p>Our Privacy Policy explains how we collect, use, and protect personal information. Key principles:</p>
<ul>
<li>We do not sell student data</li>
<li>Data is used only for educational purposes</li>
<li>Educational Institutes control student data</li>
<li>Parents can access and request deletion of their child's data</li>
</ul>
<p>We comply with the Digital Personal Data Protection Act, 2023 (India), Information Technology Act, 2000, GDPR principles, and international standards for children's privacy.</p>

<h2>8. Limitation of Liability</h2>
<p>THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLASSY SHALL NOT BE LIABLE FOR indirect, incidental, consequential, or punitive damages, loss of data, profits, or business opportunities, service interruptions, or unauthorized access.</p>
<p>Total liability shall not exceed the fees paid by the educational institute in the 12 months preceding the claim, or ₹50,000, whichever is lower.</p>

<h2>9. Indemnification</h2>
<p>You agree to indemnify, defend, and hold harmless Classy from any claims arising from your use or misuse of the Platform, violation of these Terms, violation of any law or third-party rights, content you post, disputes with other users, or failure to obtain parental consent.</p>

<h2>10. Termination</h2>
<h3>10.1 Termination by Educational Institute</h3>
<p>Educational Institutes may terminate their account at any time by providing 30 days' written notice to support@classy.in, paying any outstanding fees, and exporting all data.</p>

<h3>10.2 Termination by Classy</h3>
<p>We may suspend or terminate your account immediately if you violate these Terms, fail to pay fees, we are required by law, you engage in fraudulent activity, or your use poses a security risk.</p>

<h3>10.3 Data Deletion After Termination</h3>
<p>You have 30 days to export your data. After 30 days, all data is permanently deleted from production systems. Backup data is deleted within 90 days.</p>

<h2>11. Dispute Resolution and Governing Law</h2>
<p>These Terms are governed by the laws of India. Any legal action shall be brought exclusively in the courts of Chennai, India.</p>
<p><strong>Dispute Resolution Process:</strong></p>
<ol>
<li><strong>Informal Resolution:</strong> 30 days for good-faith negotiation</li>
<li><strong>Mediation:</strong> Conducted in Chennai, costs split equally</li>
<li><strong>Arbitration:</strong> Under the Arbitration and Conciliation Act, 1996, in Chennai</li>
<li><strong>Court Proceedings:</strong> Exclusive jurisdiction of Chennai courts</li>
</ol>

<h2>12. General Provisions</h2>
<p>These Terms, together with the Privacy Policy and Data Processing Agreement, constitute the entire agreement. We may modify these Terms with 30 days' notice. If any provision is found invalid, the remaining provisions remain in effect.</p>

<h2>13. Contact Information</h2>
<p>Classy Support Team<br/>Email: support@classy.in<br/>Phone: +91-7603969398<br/>Address: Mogappair East, Chennai</p>
<p><strong>Grievance Officer:</strong> Prabhakar R<br/>Email: legal@silverlynx.in<br/>Phone: +91-7603969398</p>

<p><strong>By using Classy, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong></p>
`
  },
  "acceptable-use": {
    title: "Acceptable Use Policy",
    html: `
<h2>1. Introduction</h2>
<p>This Acceptable Use Policy ("AUP") governs your use of the Classy platform. It applies to all users: educational institutes, administrators, teachers, parents, and students.</p>
<p>By using Classy, you agree to comply with this AUP. Violations may result in suspension or termination of your account and may be reported to institutional authorities or law enforcement.</p>
<p>Classy is an educational platform. All use must be consistent with educational purposes and must respect the rights and dignity of all users.</p>

<h2>2. Acceptable Uses</h2>
<h3>2.1 Educational Activities</h3>
<ul>
<li>✅ Tracking student attendance</li>
<li>✅ Assigning, submitting, and grading homework</li>
<li>✅ Recording and viewing academic performance</li>
<li>✅ Communicating about academic and institute-related matters</li>
<li>✅ Sharing educational resources and announcements</li>
<li>✅ Scheduling and managing institutional events</li>
<li>✅ Processing institute fee payments (if enabled)</li>
</ul>

<h3>2.2 Communication</h3>
<ul>
<li>✅ Professional communication between teachers and parents about students</li>
<li>✅ Institutional announcements to students and parents</li>
<li>✅ Academic feedback and progress reports</li>
<li>✅ Institutional event coordination</li>
</ul>

<h2>3. Prohibited Uses</h2>
<h3>3.1 Illegal Activities</h3>
<ul>
<li>❌ Violating any local, state, national, or international law</li>
<li>❌ Sharing content that promotes or facilitates illegal activities</li>
<li>❌ Fraud, theft, or misappropriation of funds</li>
<li>❌ Hacking, unauthorized access, or attempts to breach security</li>
<li>❌ Distributing malware, viruses, or harmful code</li>
</ul>

<h3>3.2 Harmful Content</h3>
<ul>
<li>❌ <strong>Child Exploitation:</strong> Sharing any sexually explicit content involving minors (criminal offense — reported to authorities immediately)</li>
<li>❌ <strong>Obscene or Pornographic Content:</strong> Uploading or sharing sexually explicit material</li>
<li>❌ <strong>Violence:</strong> Promoting, glorifying, or depicting graphic violence</li>
<li>❌ <strong>Self-Harm:</strong> Encouraging or promoting self-harm or suicide</li>
<li>❌ <strong>Hate Speech:</strong> Content that promotes hatred or discrimination based on race, religion, caste, gender, sexual orientation, disability, or any other protected characteristic</li>
</ul>

<h3>3.3 Harassment and Abuse</h3>
<ul>
<li>❌ Bullying, harassing, intimidating, or bullying students, teachers, or parents</li>
<li>❌ Making threats of violence or harm</li>
<li>❌ Unwanted, persistent contact or monitoring (stalking)</li>
<li>❌ Sharing another person's private information without consent (doxxing)</li>
</ul>

<h3>3.4 Unauthorized Access and Impersonation</h3>
<ul>
<li>❌ Accessing another user's account without permission</li>
<li>❌ Sharing your login credentials with others</li>
<li>❌ Impersonating another person</li>
<li>❌ Creating fake accounts or profiles</li>
<li>❌ Attempting to bypass access controls or security measures</li>
</ul>

<h3>3.5 Misuse of Platform Features</h3>
<ul>
<li>❌ Spamming users with excessive or irrelevant messages</li>
<li>❌ Using the platform for commercial advertising or solicitation</li>
<li>❌ Uploading false or misleading information</li>
<li>❌ Altering grades, attendance records, or other academic data without authorization</li>
<li>❌ Submitting plagiarized work or cheating on assignments</li>
</ul>

<h3>3.6 System Abuse</h3>
<ul>
<li>❌ Using automated tools (bots, scrapers) to access or extract data</li>
<li>❌ Overloading the system with excessive requests</li>
<li>❌ Reverse engineering, decompiling, or disassembling the platform</li>
<li>❌ Attempting to gain unauthorized access to Classy's servers or infrastructure</li>
</ul>

<h3>3.7 Intellectual Property Violations</h3>
<ul>
<li>❌ Uploading copyrighted content without permission</li>
<li>❌ Sharing pirated software, movies, music, or books</li>
<li>❌ Using Classy's trademarks or branding without authorization</li>
</ul>

<h3>3.8 Privacy Violations</h3>
<ul>
<li>❌ Collecting or harvesting personal information about other users</li>
<li>❌ Sharing student or parent data outside the platform without consent</li>
<li>❌ Taking screenshots or recordings of student information for unauthorized purposes</li>
</ul>

<h2>4. User-Specific Guidelines</h2>
<h3>4.1 For Institute Administrators</h3>
<p>You must:</p>
<ul>
<li>✅ Ensure all staff are trained on acceptable use</li>
<li>✅ Monitor for policy violations</li>
<li>✅ Obtain parental consent before creating student accounts</li>
<li>✅ Protect the confidentiality of student data</li>
<li>✅ Promptly report violations to Classy</li>
</ul>

<h3>4.2 For Teachers</h3>
<p>You must:</p>
<ul>
<li>✅ Maintain professional communication with students and parents</li>
<li>✅ Protect student privacy and confidentiality</li>
<li>✅ Grade assignments fairly and objectively</li>
<li>✅ Report any suspected abuse or safety concerns</li>
</ul>

<h3>4.3 For Parents</h3>
<ul>
<li>✅ Use the platform only to monitor your own child's progress</li>
<li>✅ Communicate respectfully with teachers and institutional staff</li>
<li>✅ Keep your login credentials secure</li>
<li>✅ Report any concerns about content or behavior</li>
</ul>

<h3>4.4 For Students</h3>
<ul>
<li>✅ Use the platform only for institute-related activities</li>
<li>✅ Submit your own original work</li>
<li>✅ Treat classmates, teachers, and parents with respect</li>
<li>✅ Keep your login information private</li>
<li>✅ Report bullying or inappropriate content</li>
</ul>

<h2>5. Reporting Violations</h2>
<h3>5.1 How to Report</h3>
<p><strong>For Institute-Related Issues:</strong> Contact your institute administrator</p>
<p><strong>For Platform Violations:</strong> Email: abuse@classy.in (Subject: "AUP Violation Report")</p>
<p><strong>For Child Safety Concerns:</strong> Email: safety@classy.in · Phone: +91-7603969398 (24/7)</p>
<p><strong>For Emergencies:</strong> Contact local law enforcement immediately</p>

<h3>5.2 What to Include in Reports</h3>
<ul>
<li>Description of the violation</li>
<li>Date and time</li>
<li>User involved (if known)</li>
<li>Screenshots or evidence (if available)</li>
<li>Your contact information (for follow-up)</li>
</ul>

<h2>6. Investigation and Enforcement</h2>
<h3>6.1 Investigation Process</h3>
<ol>
<li><strong>Initial Review (24–48 hours):</strong> Classy reviews the report and evidence</li>
<li><strong>Investigation:</strong> We may contact involved parties for additional information</li>
<li><strong>Educational Institute Notification:</strong> Educational Institutes are notified of violations involving their users</li>
<li><strong>Decision:</strong> Appropriate action is determined based on severity</li>
</ol>

<h3>6.2 Enforcement Actions</h3>
<p><strong>First Violation (Minor):</strong> Warning via email, requirement to acknowledge AUP, temporary restriction of features</p>
<p><strong>Second/Moderate Violation:</strong> Temporary account suspension (7–30 days), notification to institute administrators</p>
<p><strong>Serious Violation:</strong> Permanent account termination, notification to institute administrators and parents, referral to law enforcement</p>
<p><strong>Immediate Termination (No Warning):</strong> Child exploitation, threats of violence, hacking, fraud, or repeated violations</p>

<h3>6.3 Appeal Process</h3>
<p>Submit an appeal to appeals@classy.in within 30 days. We will review and respond within 14 days. Our decision after appeal review is final.</p>

<h2>7. Content Moderation</h2>
<p>Classy may monitor user activity to ensure compliance. We reserve the right to remove any content that violates this AUP without prior notice. We may use automated tools to detect malware, spam, prohibited content, and suspicious activity.</p>

<h2>8. Consequences of Violations</h2>
<p>Violations may result in account suspension or termination, removal from the platform, disciplinary action by educational institutes, civil lawsuits, criminal prosecution, or reporting to child protection authorities.</p>

<h2>9. Third-Party Content and Links</h2>
<p>Classy is not responsible for content on third-party websites. Users share external links at their own risk. Report malicious links to abuse@classy.in.</p>

<h2>10. Data Usage and Privacy</h2>
<p>All users must respect the privacy of student and user data. Use data only for educational purposes and follow institutional and legal privacy requirements.</p>

<h2>11. Intellectual Property</h2>
<p>Respect copyright when uploading content. Classy owns all rights to the platform, including design, trademarks, and branding.</p>

<h2>12. Amendments</h2>
<p>We may update this AUP at any time. We will post the revised version on our website and notify educational institutes via email. Material changes will be effective 30 days after notice.</p>

<h2>13. Contact Information</h2>
<p><strong>General Inquiries:</strong> support@classy.in · +91-7603969398</p>
<p><strong>AUP Violations:</strong> abuse@classy.in</p>
<p><strong>Child Safety:</strong> safety@classy.in · +91-7603969398 (24/7)</p>
<p><strong>Legal Department:</strong> legal@classy.in</p>

<p><strong>By using Classy, you acknowledge that you have read, understood, and agree to comply with this Acceptable Use Policy.</strong></p>
<p>Last Updated: March 16, 2026</p>
`
  }
};

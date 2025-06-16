import React from 'react';
import Footer from '../components/Footer';

function ComplainsMessages() {
  return (
    <>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Complains and Messages</h1>
        <p>This is the Complains and Messages page. Manage customer feedback here.</p>
        <section style={{ marginTop: '20px' }}>
          <h2>Complaints</h2>
          <ul>
            <li>Complaint 1: Late delivery</li>
            <li>Complaint 2: Wrong item received</li>
            <li>Complaint 3: Poor packaging</li>
          </ul>
        </section>
        <section style={{ marginTop: '20px' }}>
          <h2>Messages</h2>
          <ul>
            <li>Message 1: Great service, thank you!</li>
            <li>Message 2: Can you add more vegan options?</li>
            <li>Message 3: Loved the birthday cake!</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ComplainsMessages;

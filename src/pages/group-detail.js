import React from 'react';
import GroupDetail from '../components/group-detail';
import Footer from '../components/footer';
import Contact from '../components/contact';

const GroupDetailPage = () => {
  return (
    <div className='group-detail'>
      <div style={{ marginTop: '110px' }}>
        <GroupDetail />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default GroupDetailPage;

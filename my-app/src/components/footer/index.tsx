import React from 'react';
import './styles.scss';


const Footer: React.FC = () => {
  return (
    <div className='main-footer'>
      <span className='footer-text'>会員登録</span>
      <span className='footer-text'>運営会社</span>
      <span className='footer-text'>利用規約</span>
      <span className='footer-text'>個人情報の取扱について</span>
      <span className='footer-text'>特定商取引法に基づく表記</span>
      <span className='footer-text'>お問い合わせ</span>
    </div>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ChallengeIcon, InfoIcon, LogoIcon, MemoIcon, MenuIcon } from '../../static/image/svg';
import './styles.scss';

interface HeaderProps {
  onGoBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoBack }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigate('/');
    }
  };

  const renderContent = () => (
    <div className="box-menu">
      <div onClick={() => navigate('/my-record')} className="item">自分の記録</div>
      <div className="item">体重グラフ</div>
      <div className="item">目標</div>
      <div className="item">選択中のコース</div>
      <div onClick={() => navigate('/my-column')} className="item">コラム一覧</div>
      <div className="item">設定</div>
    </div>
  );

  return (
    <div className="main-header">
      <img className="logo-img" onClick={handleGoBack} src={LogoIcon} alt="Logo Icon" />
      <div className="header-right">
        <Button
          onClick={() => navigate('/my-record')}
          className="header-button"
          children="自分の記録"
          icon={<img src={MemoIcon} alt="Memo Icon" />}
        />
        <Button
          className="header-button"
          children="チャレンジ"
          icon={<img src={ChallengeIcon} alt="Challenge Icon" />}
        />
        <Button
          className="header-button"
          children="お知らせ"
          icon={<img src={InfoIcon} alt="Info Icon" />}
        />
        <Popover
          className="popover-box"
          content={renderContent()}
          trigger="click"
          placement="bottomRight"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button className="header-button" icon={<img src={MenuIcon} alt="Menu Icon" />} />
        </Popover>
      </div>
    </div>
  );
};

export default Header;

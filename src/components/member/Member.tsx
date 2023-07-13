import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MemberModel from '../../models/MemberModel';

interface Props {
  memberModel: MemberModel | null;
}

const Member: React.FC<Props> = ({ memberModel }) => {
  const { memberId } = useParams<{ memberId: string }>();
  const location = useLocation();

  const renderMemberInfo = () => {
    if (memberModel) {
      const memberIdText = memberModel.getId();
      const memberName = memberModel.getName();
      return `${memberIdText} / ${memberName}`;
    }
    return 'No member';
  };

  return (
    <div className="pics">
      <h2 className="like-btn">{renderMemberInfo()}</h2>
    </div>
  );
};

export default Member;
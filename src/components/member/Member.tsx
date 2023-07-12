import * as React from 'react';
import { useParams, useLocation } from 'react-router';
import MemberModel from '../../models/MemberModel';

interface IProps {
  memberModel: MemberModel | null;
}

const Member: React.FC<IProps> = ({ memberModel }) => {
  const params = useParams<{ memberId: string }>();
  const location = useLocation();

  return (
    <div className='pics'>
      <h2 className='like-btn'>
        {memberModel ? memberModel.getId() + ' / ' + memberModel.getName() : 'no member'}
      </h2>
    </div>
  );
};

export default Member;

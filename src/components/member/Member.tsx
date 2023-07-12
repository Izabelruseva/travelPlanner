import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import MemberModel from '../../models/MemberModel';

interface IProps extends RouteComponentProps<Member> {
  memberModel: MemberModel | null;
}

class Member extends React.Component<IProps, {}> {
  render() {
    const { memberModel } = this.props;

    return (
      <div className='pics'>
        <h2 className='like-btn'>{memberModel ? memberModel.getId() + ' / ' + memberModel.getName() : 'no member'}</h2>
      </div>
    );
  }
}

export default Member;

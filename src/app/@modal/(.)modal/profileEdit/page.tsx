import UserListModal from '@/components/Profile/modal/UserListModal';
import { Modal } from '@/shared/ui/Modal';

const ProfileEdit = () => {
  return (
    <Modal size="large" closeIcon>
      <UserListModal />
    </Modal>
  );
};

export default ProfileEdit;

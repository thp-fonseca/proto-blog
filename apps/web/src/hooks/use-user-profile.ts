// hooks/useFetchUserProfile.js
import { getProfile } from '@/http/get-profile';
import useSessionStore from '@/lib/store';

const useFetchUserProfile = () => {
  const setUser = useSessionStore((state) => state.setUser);

  const fetchUserProfile = async () => {
    try {
      const userData = await getProfile()

      if (userData) {
        const {user} = userData;
        setUser({
          email: user.email,
          id: user.id,
          name: user?.name ?? "",
          role: user.role,
          avatarUrl: user?.avatarUrl
        });
      } else {
        console.error('Falha ao obter perfil do usuário.');
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  };

  return fetchUserProfile;
};

export default useFetchUserProfile;

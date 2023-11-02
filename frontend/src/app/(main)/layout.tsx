import Header from '@/components/Header/index';
import RootLayout from '@/app/layout';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootLayout>
      <Header />
      {children}
    </RootLayout>
  );
};

export default MainLayout;

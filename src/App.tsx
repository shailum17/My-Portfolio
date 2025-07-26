import HomePage from './pages/HomePage';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BrowsePage } from './pages/BrowsePage'
import { HomePage } from './pages/HomePage'
import { InboxPage } from './pages/InboxPage'
import { ListingPage } from './pages/ListingPage'
import { NewListingPage } from './pages/NewListingPage'
import { AboutPage } from './pages/AboutPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explorar" element={<BrowsePage />} />
        <Route path="/novo" element={<NewListingPage />} />
        <Route path="/anuncio/:listingId" element={<ListingPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/configuracoes" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App

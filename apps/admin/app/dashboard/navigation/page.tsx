'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Menu, Check } from 'lucide-react'

interface NavigationItem {
  title: string
  href: string
}

interface Navigation {
  key: 'header' | 'footer'
  items: NavigationItem[]
}

export default function NavigationPage() {
  const [headerNav, setHeaderNav] = useState<NavigationItem[]>([])
  const [footerNav, setFooterNav] = useState<NavigationItem[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header')

  useEffect(() => {
    fetchNavigation()
  }, [])

  const fetchNavigation = async () => {
    try {
      const [headerRes, footerRes] = await Promise.all([
        fetch('http://localhost:3001/api/navigation?key=header', { credentials: 'include' }),
        fetch('http://localhost:3001/api/navigation?key=footer', { credentials: 'include' }),
      ])
      
      if (headerRes.ok) {
        const data = await headerRes.json()
        setHeaderNav(data.navigation?.items || [])
      }
      
      if (footerRes.ok) {
        const data = await footerRes.json()
        setFooterNav(data.navigation?.items || [])
      }
    } catch (error) {
      console.error('Failed to fetch navigation:', error)
    }
  }

  const saveNavigation = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    
    try {
      await Promise.all([
        fetch('http://localhost:3001/api/navigation', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ key: 'header', items: headerNav }),
        }),
        fetch('http://localhost:3001/api/navigation', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ key: 'footer', items: footerNav }),
        }),
      ])
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to save navigation:', error)
      alert('Error saving navigation. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const addMenuItem = (nav: NavigationItem[], setNav: (items: NavigationItem[]) => void) => {
    setNav([...nav, { title: 'New Menu Item', href: '#' }])
  }

  const updateMenuItem = (
    nav: NavigationItem[],
    setNav: (items: NavigationItem[]) => void,
    index: number,
    field: keyof NavigationItem,
    value: string
  ) => {
    const newItems = [...nav]
    newItems[index] = { ...newItems[index], [field]: value }
    setNav(newItems)
  }

  const removeMenuItem = (
    nav: NavigationItem[],
    setNav: (items: NavigationItem[]) => void,
    index: number
  ) => {
    if (confirm('Delete this menu item?')) {
      setNav(nav.filter((_, i) => i !== index))
    }
  }

  const NavEditor = ({
    nav,
    setNav,
    title,
  }: {
    nav: NavigationItem[]
    setNav: (items: NavigationItem[]) => void
    title: string
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg shadow-lg text-white">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-emerald-100 mt-1">Build your navigation structure</p>
        </div>
        <button
          onClick={() => addMenuItem(nav, setNav)}
          className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 flex items-center gap-2 font-semibold"
        >
          <Plus size={20} />
          Add Menu Item
        </button>
      </div>

      {nav.length > 0 ? (
        <div className="space-y-4">
          {nav.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border-2 hover:border-emerald-300 transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <Menu size={20} className="text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Menu Item Title"
                  value={item.title}
                  onChange={(e) => updateMenuItem(nav, setNav, index, 'title', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-semibold"
                />
                <button
                  onClick={() => removeMenuItem(nav, setNav, index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                <input
                  type="text"
                  placeholder="/page-url"
                  value={item.href}
                  onChange={(e) => updateMenuItem(nav, setNav, index, 'href', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Menu size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Menu Items Yet</h3>
          <p className="text-gray-600 mb-6">Start building your navigation by adding menu items.</p>
          <button
            onClick={() => addMenuItem(nav, setNav)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Create First Menu Item
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Navigation Builder</h1>
          <p className="text-gray-600 mt-1">Create professional menus for header and footer</p>
        </div>
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <Check size={20} />
              <span className="font-semibold">Saved!</span>
            </div>
          )}
          <button
            onClick={saveNavigation}
            disabled={isSaving}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2 font-semibold"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow p-2 inline-flex gap-2">
        <button
          onClick={() => setActiveTab('header')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'header'
              ? 'bg-emerald-100 text-emerald-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Header Menu
        </button>
        <button
          onClick={() => setActiveTab('footer')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            activeTab === 'footer'
              ? 'bg-emerald-100 text-emerald-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Footer Menu
        </button>
      </div>

      {/* Content */}
      {activeTab === 'header' && (
        <NavEditor nav={headerNav} setNav={setHeaderNav} title="Header Navigation" />
      )}
      {activeTab === 'footer' && (
        <NavEditor nav={footerNav} setNav={setFooterNav} title="Footer Navigation" />
      )}
    </div>
  )
}

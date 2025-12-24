import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Trash2, Edit2, Plus, Wand2, Loader2, Save, X, Upload, Image as ImageIcon, Layers, Globe } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateProduct: (product: Product) => void;
  onClose: () => void;
}

const AdminPanel = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct, onClose }: AdminPanelProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    name_km: '',
    price: 0,
    description: '',
    description_km: '',
    scent: '',
    scent_km: '',
    ingredients: '',
    ingredients_km: '',
    image: 'https://picsum.photos/400/400',
    images: []
  });
  
  // Local state for the gallery text area
  const [galleryText, setGalleryText] = useState('');

  // Sync gallery text when editing
  useEffect(() => {
    if (formData.images && formData.images.length > 0) {
      setGalleryText(formData.images.join('\n'));
    } else {
      setGalleryText('');
    }
  }, [formData.images, isEditing]);

  const resetForm = () => {
    setFormData({
      name: '',
      name_km: '',
      price: 0,
      description: '',
      description_km: '',
      scent: '',
      scent_km: '',
      ingredients: '',
      ingredients_km: '',
      image: `https://picsum.photos/400/400?random=${Date.now()}`,
      images: []
    });
    setGalleryText('');
    setIsEditing(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setGalleryText(e.target.value);
    // Split by new line or comma, trim whitespace, and filter empty strings
    const imagesArray = e.target.value.split(/[\n,]+/).map(url => url.trim()).filter(url => url.length > 0);
    setFormData(prev => ({ ...prev, images: imagesArray }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name || !formData.scent || !formData.ingredients) {
      alert("Please fill in Name, Scent, and Ingredients to generate a description.");
      return;
    }

    setLoadingAI(true);
    try {
      const description = await generateProductDescription(
        formData.name,
        formData.scent || '',
        formData.ingredients || ''
      );
      setFormData(prev => ({ ...prev, description }));
    } catch (e) {
      alert("Failed to generate description. Ensure API Key is configured.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    // Ensure images array includes the main image if it's empty
    let finalImages = formData.images || [];
    if (finalImages.length === 0 && formData.image) {
      finalImages = [formData.image];
    }
    // Ensure main image is included in gallery if not already
    if (formData.image && !finalImages.includes(formData.image)) {
        finalImages = [formData.image, ...finalImages];
    }

    const product: Product = {
      id: isEditing || Date.now().toString(),
      name: formData.name,
      name_km: formData.name_km || '',
      price: formData.price,
      description: formData.description || '',
      description_km: formData.description_km || '',
      scent: formData.scent || '',
      scent_km: formData.scent_km || '',
      ingredients: formData.ingredients || '',
      ingredients_km: formData.ingredients_km || '',
      image: formData.image || 'https://picsum.photos/400/400',
      images: finalImages
    };

    if (isEditing) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
    resetForm();
  };

  const startEdit = (product: Product) => {
    setIsEditing(product.id);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-black">Inventory Management</h2>
          <p className="text-black mt-1">Create, update, and remove soaps from your catalog.</p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-transparent border-2 border-brand-orange-900 text-black hover:bg-brand-orange-900 hover:text-black rounded-lg flex items-center shadow-sm transition-all"
        >
          <X className="w-4 h-4 mr-2" /> Exit Admin
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-brand-orange-100 sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center text-black border-b border-brand-orange-50 pb-4">
              {isEditing ? <Edit2 className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
              {isEditing ? 'Edit Item' : 'New Item'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Main Image Preview & Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">Main Image (Cover)</label>
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-brand-orange-50 border border-brand-orange-200 group">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-black">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-white text-sm font-medium flex items-center bg-brand-orange-900/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-transparent hover:border-brand-orange-900 transition-all"
                      >
                        <Upload className="w-3 h-3 mr-1" /> Change
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleInputChange}
                      placeholder="Or paste Image URL"
                      className="flex-1 p-2 border border-brand-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange-400 focus:outline-none"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-brand-orange-50 border border-brand-orange-200 hover:bg-brand-orange-100 hover:border-brand-orange-900 text-black px-3 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Images Input */}
              <div>
                  <label className="block text-sm font-medium text-black mb-2 flex items-center">
                      <Layers className="w-4 h-4 mr-2" /> Gallery Images
                  </label>
                  <textarea
                    value={galleryText}
                    onChange={handleGalleryChange}
                    rows={3}
                    placeholder="Paste additional image URLs here (separated by new lines or commas)"
                    className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none text-sm font-mono text-xs"
                  />
                  <p className="text-xs text-black mt-1">These will appear in the product detail gallery.</p>
              </div>

              {/* Basic Info */}
              <div className="bg-brand-orange-50/50 p-4 rounded-xl space-y-3">
                 <h4 className="text-sm font-bold text-black flex items-center"><Globe className="w-3 h-3 mr-2"/> Basic Info</h4>
                 <div>
                  <label className="block text-xs font-medium text-black mb-1">Name (English)</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none"
                    placeholder="e.g. Lavender Mist"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-black mb-1">Name (Khmer)</label>
                  <input
                    name="name_km"
                    value={formData.name_km}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none"
                    placeholder="e.g. សាប៊ូឡាវេនឌ័រ"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">Price ($)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Scent & Ingredients */}
              <div className="bg-brand-orange-50/50 p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-black flex items-center"><Layers className="w-3 h-3 mr-2"/> Details</h4>
                <div>
                  <label className="block text-xs font-medium text-black mb-1">Scent (En / Km)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      name="scent"
                      value={formData.scent}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-brand-orange-200 rounded-lg text-xs"
                      placeholder="English"
                    />
                    <input
                      name="scent_km"
                      value={formData.scent_km}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-brand-orange-200 rounded-lg text-xs"
                      placeholder="Khmer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-black mb-1">Ingredients (En / Km)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      name="ingredients"
                      value={formData.ingredients}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-brand-orange-200 rounded-lg text-xs"
                      placeholder="English"
                    />
                    <input
                      name="ingredients_km"
                      value={formData.ingredients_km}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-brand-orange-200 rounded-lg text-xs"
                      placeholder="Khmer"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-black">Description (English)</label>
                  <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={loadingAI}
                    className="text-xs flex items-center bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 hover:border-brand-orange-900 px-3 py-1.5 rounded-full transition-all font-medium shadow-sm"
                    title="Generate with Gemini AI"
                  >
                    {loadingAI ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Wand2 className="w-3 h-3 mr-1" />}
                    AI Generate
                  </button>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none text-sm mb-2"
                  placeholder="Description of the soap..."
                />
                
                <label className="block text-sm font-medium text-black mb-1">Description (Khmer)</label>
                <textarea
                  name="description_km"
                  value={formData.description_km}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-brand-orange-200 rounded-lg focus:ring-2 focus:ring-brand-orange-400 focus:outline-none text-sm"
                  placeholder="ការពិពណ៌នាអំពីសាប៊ូ..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-transparent border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-black py-3 rounded-xl font-medium transition-all shadow-sm"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-transparent text-black py-3 rounded-xl font-medium hover:bg-brand-orange-900 hover:text-black transition-all flex justify-center items-center shadow-md active:scale-[0.98] border-2 border-brand-orange-900"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Update Soap' : 'Add Soap'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center justify-between">
            <span>Current Inventory</span>
            <span className="text-sm font-normal text-black bg-brand-orange-100 px-3 py-1 rounded-full">{products.length} Items</span>
          </h3>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-brand-orange-200 text-black">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No products found. Add your first soap to get started.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map(product => (
                <div
                  key={product.id}
                  className={`bg-white p-4 rounded-xl shadow-sm border transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center group
                    ${isEditing === product.id ? 'border-brand-orange-400 ring-1 ring-brand-orange-400 bg-brand-orange-50' : 'border-brand-orange-100 hover:shadow-md hover:border-brand-orange-200'}
                  `}
                >
                  <div className="relative w-full sm:w-20 h-20 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full rounded-lg object-cover bg-brand-orange-50"
                    />
                    {product.images && product.images.length > 1 && (
                         <div className="absolute bottom-1 right-1 bg-black/50 text-white text-[10px] px-1.5 rounded-full flex items-center">
                            <Layers className="w-3 h-3 mr-1" /> {product.images.length}
                         </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-black text-lg truncate">{product.name}</h4>
                      <span className="font-serif font-bold text-black">${product.price.toFixed(2)}</span>
                    </div>
                    {product.name_km && <p className="text-xs text-black mb-1">{product.name_km}</p>}
                    <p className="text-sm text-black truncate mb-1">{product.scent}</p>
                    <p className="text-xs text-black line-clamp-1">{product.description}</p>
                  </div>

                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => startEdit(product)}
                      className={`flex-1 sm:flex-none p-2 rounded-lg transition-all flex items-center justify-center border-2 shadow-sm
                        ${isEditing === product.id
                          ? 'bg-brand-orange-900 text-black border-brand-orange-900'
                          : 'bg-transparent text-black border-brand-orange-200 hover:bg-brand-orange-900 hover:text-black hover:border-brand-orange-900'}
                      `}
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 mr-2 sm:mr-0" />
                      <span className="sm:hidden text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="flex-1 sm:flex-none p-2 bg-transparent text-red-500 border-2 border-red-200 hover:bg-red-500 hover:text-black hover:border-red-500 rounded-lg transition-all flex items-center justify-center shadow-sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 mr-2 sm:mr-0" />
                      <span className="sm:hidden text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
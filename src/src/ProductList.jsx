import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Cleans indoor air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Natural humidifier.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Removes toxins.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Air cleaning and healing.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828911_1280.jpg", description: "Calming scent.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/08/07/14/02/manjas-2604149_1280.jpg", description: "Sweet floral fragrance.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Aromatic culinary herb.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/27/18/30/mint-1165183_1280.jpg", description: "Refreshing aroma.", cost: "$10" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/06/17/14/09/lemon-balm-1463328_1280.jpg", description: "Citrus scent.", cost: "$12" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/09/20/08/22/eucalyptus-1682012_1280.jpg", description: "Invigorating fragrance.", cost: "$22" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/12/19/45/echinacea-565809_1280.jpg", description: "Boosts immune system.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496781_1280.jpg", description: "Aids digestion.", cost: "$11" },
        { name: "Holy Basil", image: "https://cdn.pixabay.com/photo/2021/01/13/11/49/tulsi-5913955_1280.jpg", description: "Stress reliever.", cost: "$13" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/thyme-2305199_1280.jpg", description: "Antimicrobial properties.", cost: "$12" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/20/12/03/marigold-4350616_1280.jpg", description: "Soothes skin.", cost: "$14" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2017/06/18/21/37/chamomile-2417240_1280.jpg", description: "Promotes sleep.", cost: "$15" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>Cart 🛒 ({totalQuantity})</span>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h1>{categoryObj.category}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', width: '250px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                      style={{ padding: '8px 12px', backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

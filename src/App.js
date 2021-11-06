import "./App.css";
import iphone from './assets/Images/iphone.jpeg';
import macbook from './assets/Images/macbook.jpeg'
function App() {
  const phonePrice = 67999;
  const laptopPrice = 125000;
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "razorpay-key",
      currency: "INR",
      amount: amount,
      name: "Sparsh",
      description: "Thanks for purchasing",
      image:
        "",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
      },
      prefill: {
        name: "Sparsh",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="App">
      <div className="product">
        <>
          <div className="prod-container">
            <div className="left-container">
              <div className="prod-container-left">
                <img
                  src={iphone}
                  alt="pimage"
                />
              </div>
            </div>

            <div className="prod-container-right">
              <div className="prod-container-info">
                <h1>APPLE iPhone 12 (Purple, 64 GB)</h1>
                <div className="itemOption__rating">
                  <p>4.6</p>
                  <span>
                    <img
                      src="https://img.icons8.com/fluency/2x/star.png"
                      alt=""
                    />
                  </span>
                </div>
                <p>{formatter.format(phonePrice)}</p>
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => displayRazorpay(phonePrice)}>
                BUY NOW
              </button>
            </div>
          </div>
        </>
      </div>
      <div className="product">
        <>
          <div className="prod-container">
            <div className="left-container">
              <div className="prod-container-left">
                <img
                  src={macbook}
                  alt="pimage"
                />
              </div>
            </div>

            <div className="prod-container-right">
              <div className="prod-container-info">
                <h1>Mac book Air</h1>
                <div className="itemOption__rating">
                  <p>4.5</p>
                  <span>
                    <img
                      src="https://img.icons8.com/fluency/2x/star.png"
                      alt=""
                    />
                  </span>
                </div>
                <p>{formatter.format(laptopPrice)}</p>
              </div>
            </div>
            <div className="buttons">
              <button onClick={() => displayRazorpay(laptopPrice)}>
                BUY NOW
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default App;

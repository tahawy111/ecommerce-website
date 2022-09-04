import axiosIntance from "../helpers/axios";
import {
  addItemToCartFailure,
  addItemToCartRequest,
  addItemToCartSuccess,
  getCartByIdFailure,
  getCartByIdRequest,
  getCartByIdSuccess,
  updateCartQuantityFailure,
  updateCartQuantityRequest,
  updateCartQuantitySuccess,
} from "../slices/cartSlice";
export const addToCart = (product) => {
  return async (dispatch) => {
    const payload = {
      cartItems: product,
    };
    dispatch(addItemToCartRequest());
    const res = await axiosIntance.post("/user/cart/add-to-cart", payload);
    console.log(res);
    if (res.status === 201 || res.status === 200) {
      dispatch(addItemToCartSuccess({ cart: res.data.cart }));
    } else {
      dispatch(addItemToCartFailure({ error: res.data.error }));
    }
  };
};

export const getCartById = (id) => {
  return async (dispatch) => {
    dispatch(getCartByIdRequest());
    try {
      const res = await axiosIntance.get(`/user/cart/get-cart-by-id/${id}`);
      dispatch(getCartByIdSuccess({ cart: res.data.cart }));
    } catch (error) {
      dispatch(getCartByIdFailure({ error: error.data.error }));
    }
    // console.log(res.data);
    // if (res.status === 200) {
    //   return;
    // }
  };
};

export const updateCartQty = (cartId, productId, qty) => {
  return async (dispatch) => {
    dispatch(updateCartQuantityRequest());
    try {
      const res = await axiosIntance.put("/user/cart/update-cart-quantity", {
        cartId,
        productId,
        qty,
      });
      dispatch(updateCartQuantitySuccess({ cart: res.data.cart }));
    } catch (error) {
      dispatch(updateCartQuantityFailure({ error }));
    }
  };
};

// const getCartItems = () => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
//       const res = await axios.post(`/user/getCartItems`);
//       if (res.status === 200) {
//         const { cartItems } = res.data;
//         console.log({ getCartItems: cartItems });
//         if (cartItems) {
//           dispatch({
//             type: cartConstants.ADD_TO_CART_SUCCESS,
//             payload: { cartItems },
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

//    export const addToCart = (product, newQty = 1) => {
//      return async (dispatch) => {
//        const {
//          cart: { cartItems },
//          auth,
//        } = store.getState();
//        //console.log('action::products', products);
//        //const product = action.payload.product;
//        //const products = state.products;
//        const qty = cartItems[product._id]
//          ? parseInt(cartItems[product._id].qty + newQty)
//          : 1;
//        cartItems[product._id] = {
//          ...product,
//          qty,
//        };

//        if (auth.authenticate) {
//          dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
//          const payload = {
//            // cartItems: Object.keys(cartItems).map((key, index) => {
//            //     return {
//            //         quantity: cartItems[key].qty,
//            //         product: cartItems[key]._id
//            //     }
//            // })
//            cartItems: [
//              {
//                product: product._id,
//                quantity: qty,
//              },
//            ],
//          };
//          console.log(payload);
//          const res = await axios.post(`/user/cart/addtocart`, payload);
//          console.log(res);
//          if (res.status === 201) {
//            dispatch(getCartItems());
//          }
//        } else {
//          localStorage.setItem("cart", JSON.stringify(cartItems));
//        }

//        console.log("addToCart::", cartItems);

//        dispatch({
//          type: cartConstants.ADD_TO_CART_SUCCESS,
//          payload: { cartItems },
//        });
//      };
//    };

//    export const removeCartItem = (payload) => {
//      return async (dispatch) => {
//        try {
//          dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
//          const res = await axios.post(`/user/cart/removeItem`, { payload });
//          if (res.status === 202) {
//            dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
//            dispatch(getCartItems());
//          } else {
//            const { error } = res.data;
//            dispatch({
//              type: cartConstants.REMOVE_CART_ITEM_FAILURE,
//              payload: { error },
//            });
//          }
//        } catch (error) {
//          console.log(error);
//        }
//      };
//    };

//    export const updateCart = () => {
//      return async (dispatch) => {
//        const { auth } = store.getState();
//        let cartItems = localStorage.getItem("cart")
//          ? JSON.parse(localStorage.getItem("cart"))
//          : null;

//        console.log("upppppppppp");

//        if (auth.authenticate) {
//          localStorage.removeItem("cart");
//          //dispatch(getCartItems());
//          if (cartItems) {
//            const payload = {
//              cartItems: Object.keys(cartItems).map((key, index) => {
//                return {
//                  quantity: cartItems[key].qty,
//                  product: cartItems[key]._id,
//                };
//              }),
//            };
//            if (Object.keys(cartItems).length > 0) {
//              const res = await axios.post(`/user/cart/addtocart`, payload);
//              if (res.status === 201) {
//                dispatch(getCartItems());
//              }
//            }
//          } else {
//            dispatch(getCartItems());
//          }
//        } else {
//          if (cartItems) {
//            dispatch({
//              type: cartConstants.ADD_TO_CART_SUCCESS,
//              payload: { cartItems },
//            });
//          }
//        }
//      };
//    };

//    export { getCartItems };

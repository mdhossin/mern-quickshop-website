import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/wishlistConstants";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      // check if the product item already have
      const isItemExist = state.wishlistItems.find(
        (i) => i.product === item.product
      );

      // if exist run if block
      if (isItemExist) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };

        // if dont exist run else block
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

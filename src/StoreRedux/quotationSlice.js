// reducers/quotationReducer.js
import { createSlice } from "@reduxjs/toolkit";

export const quotationSlice = createSlice({
  name: "quotation",
  initialState: {
    quotations: [],
  },
  reducers: {
    addQuotations: (state, action) => {
      state.quotations = action.payload;
    },
    addNewQuotation: (state, action) => {
      state.quotations = [action.payload, ...state.quotations];
    },
    updateQuotations: (state, action) => {
      let data = action.payload;
      let index = state.quotations.findIndex((obj) => obj._id === data._id);
      if (index !== -1) {
        state.quotations[index] = data;
      }
    },
    deleteQuotation: (state, action) => {
      let id = action.payload;
      const updatedQuotations = state.quotations.filter(function (quotation) {
        return quotation._id !== id;
      });
      state.quotations = updatedQuotations;
    },
    deleteQuotationMedia: (state, action) => {
      const { id, mediaUrl } = action.payload;
      state.quotations = state.quotations.map((quotation) => {
        if (quotation._id === id) {
          // Remove the deleted media from the quotation object
          return {
            ...quotation,
            businessLogo: quotation.businessLogo !== mediaUrl ? quotation.businessLogo : null,
            client: {
              ...quotation.client,
              businessImage: quotation.client.businessImage !== mediaUrl ? quotation.client.businessImage : null,
            },
            descriptionField:{...quotation.descriptionField, attachment: quotation.descriptionField.attachment !== mediaUrl ? quotation.descriptionField.attachment : null,},
            items: quotation.items.map((item) => ({
              ...item,
              thumbnailImage: item.thumbnailImage !== mediaUrl ? item.thumbnailImage : null,
            })),
          };
        }
        return quotation;
      });
    },
  },
});
export const selectQuotations = (state) => state.quotation.quotations;
export const {
  addQuotations,
  updateQuotations,
  deleteQuotation,
  addNewQuotation,
  deleteQuotationMedia,
} = quotationSlice.actions;

export default quotationSlice.reducer;

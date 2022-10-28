import mongoose, { Schema } from 'mongoose';

const crawledPageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  //todo: add here the missing fields
  parentQueryId: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true
  },
  // We don't set required: true to the fields below, because some pages might not have h1, h2, description.
  // If the page does not have h1, h1 value will be set  to null.
  description: {
    type: String,
  },
  h1: {
    type: String,
  },
  h2: {
    type: String,
  },
  links: [{
    type: String,
    default: []
  }],
  creationDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CrawledPage', crawledPageSchema);

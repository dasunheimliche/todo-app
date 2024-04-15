import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const tagSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      required: false,
    },
    tags: {
      type: [tagSchema],
      required: false,
    },
    archived: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret._hash;
  },
});

tagSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret._hash;
  },
});

noteSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret._hash;
  },
});

const Task = mongoose.model("Task", taskSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Note = mongoose.model("Note", noteSchema);

export { Task, Tag, Note };

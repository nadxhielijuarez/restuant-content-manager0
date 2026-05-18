import React, { useState } from 'react';
import image from '../images/placeholderImage.png';
import '../css/menu.css';
import '../css/create-new-menu-item.css';
import UploadImage from "./uploadImage";
import { uploadFiles } from "../lib/upload_thing/upload_thing";
import { createMenuItem } from "../lib/menuItems";

type CreateNewMenuItemProps = {
    key?: React.Key;
    image: string;
    name: string;
    price: string;
    description: string;
    newProduct?: boolean;
    id?: number;
  };




  export default function CreateNewMenuItem() {
    const [submitting, setSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [newProduct, setNewProduct] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            setIsSubmitting(true);
            let uploadedImageUrl: string | undefined;
            if (selectedImage) {
              try {
                const uploaded = await uploadFiles("imageUploader", {
                  files: [selectedImage],
                });
                uploadedImageUrl = uploaded[0]?.ufsUrl;
              } catch (uploadError) {
                console.error("Image upload failed:", uploadError);
                setError("Image upload failed. Please try again.");
                setIsSubmitting(false);
                return;
              }
            }
          await createMenuItem({
            name,
            price,
            description,
            image: uploadedImageUrl ?? null,
            new_product: newProduct,
            "out-of-stock": false,
          });

          setName("");
          setPrice("");
          setDescription("");
          setNewProduct(false);
          setSelectedImage(null);
          setError(null);
        } catch (err) {
          console.error("Submit failed:", err);
          setError(
            err instanceof Error ? err.message : "Failed to create menu item."
          );
        } finally {
          setIsSubmitting(false);
          setSubmitting(false);
        }
      }
    return (
      <form className="createNewMenuItem-form" onSubmit={handleSubmit}>
        {error && <p className="createNewMenuItem-error">{error}</p>}
        <div className='createNewMenuItem-imageWrap'>
            <UploadImage selectedFile={selectedImage} onFileChange={setSelectedImage} />
        </div>

        <div className="createNewMenuItem-field-container">
            <p>Title: </p>
            <input 
            className="menuItem-field"
            type="text"
            placeholder="Enter Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></input>            
        </div>
        <div className="createNewMenuItem-field-container">
            <p>Price: </p>
            <input className="menuItem-field"
            type="text" inputMode="decimal"
            id="float-input" name="float-input" 
            pattern="[0-9]*[.,]?[0-9]*"
            placeholder="Enter Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            ></input>
        </div>

        <div className="createNewMenuItem-field-container">
            <p>Description: </p>
            <textarea
            className="createNewMenuItem-description-field"
            placeholder="Enter Item Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <div className="createNewMenuItem-field-container">
            <p>Is New Product: </p>
            <input className="menuItem-newProduct-field"
            type="checkbox"
            checked={newProduct}
            onChange={(e) => setNewProduct(e.target.checked)}
            ></input>
        </div>


        <button type="submit" className="createNewMenuItem-button" disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Create New Menu Item"}
        </button>
      </form>
    );
  }
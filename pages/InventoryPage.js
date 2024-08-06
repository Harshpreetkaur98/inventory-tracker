'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography, Modal , Stack, TextField, Button} from "@mui/material";
import { collection, query, deleteDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import "@/styles/page.css";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open , setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setsSearchQuery] = useState('');

  const updateInventory = async() => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList);
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()     
        await setDoc(docRef,  {quantity: quantity + 1})       
    }
    else{
      await setDoc(docRef,  {quantity: 1})
    }

    await updateInventory();
  }


  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef,  {quantity: quantity - 1})
      }
    }

    await updateInventory();
  }

  useEffect(() => {
    updateInventory();
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return(
    <Box className="centered-container">
      <Modal open={open} onClose={handleClose}>  
        <Box className = "modal-box">
          <Typography variant="h6">Add Item</Typography>
          <Stack width = "100%" direction = "row" spacing={2}></Stack>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e)=>{
                setItemName(e.target.value)
              }}
            />
            <Button 
            variant = "outlined"
            onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >Add</Button>
        </Box>
      </Modal>
      <Button className="add-item-button" variant = "container" onClick= {() => {
        handleOpen()
      }}
      >
        Add New Item
      </Button>
      <TextField
        variant="outlined"
        placeholder = "Search items..."
        fullWidth
        value = {searchQuery}
        onChange={(e) => setsSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Box className="inventory-container">
        <Box className="header">
          <Typography variant="h2" color="#333">Inventory Items</Typography>
        </Box>
      <Stack width = "800px" height = "300px" spacing={2} overflow="auto">
        {inventory.map(({name, quantity}) => (
            <Box 
            key={name} 
            className="item-box">
              <Typography
               variant="h3"
               color="#333"
              className="typography-center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}   
                </Typography>
                
                <Typography
               variant="h3"
               color="#333"
                className="typography-center">
                  {quantity}   
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant = "contained" onClick={() => {
                    addItem(name)
                  }}
                  >
                    Add
                  </Button>

                  <Button variant = "contained" onClick={() => {
                    removeItem(name)
                  }}
                  >
                    Remove
                  </Button>
                </Stack>
            </Box>
          ))}

      </Stack>
    </Box>
    </Box>

    )
}

import React, { useState, useEffect } from 'react';
import { StorageManager, StorageImage } from '@aws-amplify/ui-react-storage';
import { list, remove } from 'aws-amplify/storage';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadFile: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const filePath = 'picture-submissions/';

  useEffect(() => {
    fetchPhotos();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const fetchPhotos = async () => {
    try {
      const result = await list({
        path: filePath, // Replace with your desired path
      });
      console.log(result.items);
      setPhotos(result.items);
    } catch (error) {
      console.error('Error listing photos:', error);
    }
  };

  const handleDelete = async (path: string) => {
    try {
      await remove({ path: path });
      fetchPhotos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <Container sx={{ paddingTop: '50px' }}>
      <StorageManager
        acceptedFileTypes={['image/*']}
        path="picture-submissions/"
        maxFileCount={1}
        isResumable
        onUploadSuccess={fetchPhotos} // Refresh the list after upload
      />
      <Typography variant="h3" sx={{ padding: '20px' }} gutterBottom>
        Uploaded Photos
      </Typography>
      <Grid container spacing={2}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component={StorageImage}
                alt="cat"
                path={photo.path}
                sx={{ height: 200 }}
              />
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(photo.path)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UploadFile;

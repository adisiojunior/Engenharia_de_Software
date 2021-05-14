/* eslint-disable radix */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Upload from '../../Components/Upload';
import FileList from '../../Components/FileList';
import api from '../../services/api';
import { Container, Content } from './styles';

class UploadPhotos extends Component {
  state = {
    uploadedFiles: [],
  };

  async componentDidMount() {
    const response = await api.get('posts');

    this.setState({
      uploadedFiles: response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: 3072,
        preview: file.url,
        uploaded: true,
        url: file.url,
      })),
    });
  }

  handleUpload = (files) => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: 1,
      name: file.name,
      readableSize: 3072,
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('posts', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  handleDelete = async (id) => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
    });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach((file) =>
      URL.revokeObjectURL(file.preview)
    );
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
      </Container>
    );
  }
}

export default UploadPhotos;

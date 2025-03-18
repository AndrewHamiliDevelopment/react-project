import React from "react";
import { imageURL } from "./constants";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { Api } from "./api";
import { nanoid } from "nanoid";
import { AxiosError } from "axios";

interface ImageList {
  label: string;
  url: string;
}

const api = new Api(imageURL);

const App: React.FC = () => {
  const [imageList, setImageList] = React.useState<ImageList[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const addImage = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await api.getPicsumImage();
      setImageList((prev) => [
        ...prev,
        {
          label: `${nanoid()}`,
          url: URL.createObjectURL(response.data),
        },
      ]);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        window.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    if (isLoading) return;
    if (imageList.length < 1) {
      return;
    }
    const index =
      imageList.length === 1
        ? 0
        : Math.floor(Math.random() * imageList.length - 1);
    const current = [...imageList];
    current.splice(index, 1);
    setImageList([...current]);
    setActiveIndex(0);
  };

  const onSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <Container fluid>
        {imageList.length > 0 && (
          <Carousel
            interval={1024}
            activeIndex={activeIndex}
            onSelect={onSelect}
            fade
          >
            {imageList.map((image, index) => (
              <Carousel.Item key={index}>
                <Image width={"100%"} src={image.url} />
                <Carousel.Caption>
                  <h1>{image.label}</h1>
                  <p>{`This is ${image.label}.`}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}

        <Row>
          <Col>
            <Button
              variant="success"
              disabled={isLoading}
              onClick={() => addImage()}
            >
              {isLoading ? "Loading..." : "Add image"}
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              disabled={isLoading}
              onClick={() => removeImage()}
            >
              Remove random image
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

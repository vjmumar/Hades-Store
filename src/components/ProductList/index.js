import React,{useContext,lazy,Suspense, useState} from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';
import { HomeContext } from '../../page/Home/context';
import { Pagination } from "@material-ui/lab";
import useComponentShouldUpdate from '../../hooks/useComponentShouldUpdate';
import ProductCategorySelect from "./CategorySelector/index";
import Loader from '../../assets/loader.gif';
import RingLoader from '../../assets/ringloader.gif'
import ProductSortSelect from './SortSelector';

//lazy
const ProductBox = lazy(() => import("./ProductsBoxes/index"))

const ProductList = () => {

  const {isLoading,products, paginatedProducts ,onPaginateProducts, isFiltered, filteredProducts } = useContext(HomeContext);
  const [paginationSize,setPaginationSize] = useState(20);

  const handlePagination = (e,value) => {
	onPaginateProducts(value);
  }

useComponentShouldUpdate(() => {
 setPaginationSize(Math.ceil((isFiltered ? filteredProducts.length : products.length) / 4));
},[filteredProducts, isLoading])

	return (
<>
  <Heading
    p={"30px 0px"}
    w={"100%"}
    textAlign={"center"}
    fontSize={"40px"}
    borderTop={"1.5px solid #E2E8F0"}
    borderBottom={"1.5px solid #E2E8F0"}
  >
    Products
  </Heading>
  <Flex flexDirection={{base: "column", lg: "row"}} paddingTop={"30px"} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>

    <Flex mb={{base: "20px"}} w={{base: "100%", lg:"fit-content"}} flexDirection="row">
    <ProductCategorySelect />
    <ProductSortSelect />
    </Flex>

    <Pagination
      count={10}
      variant="outlined"
      shape="rounded"
      onChange={handlePagination}
      count={paginationSize}
    />
  </Flex>
  <Flex
    w={"100%"}
    p={"30px 0px"}
    gap={"20px"}
    justifyContent={{base: "center",lg: paginatedProducts.length !== 4 ? 'flex-start' : "space-between"}}
    flexWrap={"wrap"}
  >
    {!isLoading && paginatedProducts ? 
     <Suspense fallback={<Image src = {RingLoader} />}>
         <ProductBox />
     </Suspense>
    : (
      <Image margin={"auto"} src={Loader} />
    )}
    {!paginatedProducts.length && !isLoading && <Heading>Empty</Heading>}
  </Flex>
</>
	);
};

export default ProductList;

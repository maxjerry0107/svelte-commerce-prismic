// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type CollectionPageDocumentDataSlicesSlice =
	| NonPrismicContentSlice
	| HeroImageWithTextSlice
	| ImageDescriptionSlice;

/**
 * Content for Collection Page documents
 */
interface CollectionPageDocumentData {
	/**
	 * Slice Zone field in *Collection Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: collection_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<CollectionPageDocumentDataSlicesSlice> /**
	 * Meta Description field in *Collection Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: collection_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Collection Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: collection_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;

	/**
	 * Meta Title field in *Collection Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: collection_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Collection Page document from Prismic
 *
 * - **API ID**: `collection_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CollectionPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
	Simplify<CollectionPageDocumentData>,
	'collection_page',
	Lang
>;

type HomePageDocumentDataSlicesSlice =
	| CollectionSliderSlice
	| HeroSliderSlice
	| ImageDescriptionSlice;

/**
 * Content for Home Page documents
 */
interface HomePageDocumentData {
	/**
	 * Slice Zone field in *Home Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice> /**
	 * Meta Description field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: home_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Home Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;

	/**
	 * Meta Title field in *Home Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Home Page document from Prismic
 *
 * - **API ID**: `home_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
	Simplify<HomePageDocumentData>,
	'home_page',
	Lang
>;

type ProductPageDocumentDataSlicesSlice = ImageDescriptionSlice;

/**
 * Content for Product Page documents
 */
interface ProductPageDocumentData {
	/**
	 * Slice Zone field in *Product Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<ProductPageDocumentDataSlicesSlice> /**
	 * Meta Description field in *Product Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: product_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */;
	meta_description: prismic.KeyTextField;

	/**
	 * Meta Image field in *Product Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: product_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	meta_image: prismic.ImageField<never>;

	/**
	 * Meta Title field in *Product Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: product_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Product Page document from Prismic
 *
 * - **API ID**: `product_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProductPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
	Simplify<ProductPageDocumentData>,
	'product_page',
	Lang
>;

export type AllDocumentTypes = CollectionPageDocument | HomePageDocument | ProductPageDocument;

/**
 * Primary content in *CollectionSlider → Primary*
 */
export interface CollectionSliderSliceDefaultPrimary {
	/**
	 * Title field in *CollectionSlider → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: collection_slider.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Collection Handle field in *CollectionSlider → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: collection_slider.primary.collection_handle
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	collection_handle: prismic.KeyTextField;
}

/**
 * Default variation for CollectionSlider Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CollectionSliderSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<CollectionSliderSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *CollectionSlider*
 */
type CollectionSliderSliceVariation = CollectionSliderSliceDefault;

/**
 * CollectionSlider Shared Slice
 *
 * - **API ID**: `collection_slider`
 * - **Description**: CollectionSlider
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CollectionSliderSlice = prismic.SharedSlice<
	'collection_slider',
	CollectionSliderSliceVariation
>;

/**
 * Primary content in *HeroImageWithText → Primary*
 */
export interface HeroImageWithTextSliceDefaultPrimary {
	/**
	 * Image field in *HeroImageWithText → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_image_with_text.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Sub Heading field in *HeroImageWithText → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_image_with_text.primary.sub_heading
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	sub_heading: prismic.KeyTextField;

	/**
	 * Heading field in *HeroImageWithText → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_image_with_text.primary.heading
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	heading: prismic.KeyTextField;

	/**
	 * CTA Title field in *HeroImageWithText → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_image_with_text.primary.cta_title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	cta_title: prismic.KeyTextField;

	/**
	 * CTA Link field in *HeroImageWithText → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_image_with_text.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	cta_link: prismic.KeyTextField;
}

/**
 * Default variation for HeroImageWithText Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroImageWithTextSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<HeroImageWithTextSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *HeroImageWithText*
 */
type HeroImageWithTextSliceVariation = HeroImageWithTextSliceDefault;

/**
 * HeroImageWithText Shared Slice
 *
 * - **API ID**: `hero_image_with_text`
 * - **Description**: HeroImageWithText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroImageWithTextSlice = prismic.SharedSlice<
	'hero_image_with_text',
	HeroImageWithTextSliceVariation
>;

/**
 * Primary content in *HeroSlider → Items*
 */
export interface HeroSliderSliceDefaultItem {
	/**
	 * Hero Image field in *HeroSlider → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_slider.items[].hero_image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	hero_image: prismic.ImageField<never>;

	/**
	 * Hero Title field in *HeroSlider → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_slider.items[].hero_title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	hero_title: prismic.KeyTextField;

	/**
	 * Hero Description field in *HeroSlider → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_slider.items[].hero_description
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	hero_description: prismic.KeyTextField;

	/**
	 * Hero CTA Title field in *HeroSlider → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_slider.items[].hero_cta_title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	hero_cta_title: prismic.KeyTextField;

	/**
	 * Hero CTA Link field in *HeroSlider → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_slider.items[].hero_cta_link
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	hero_cta_link: prismic.KeyTextField;
}

/**
 * Default variation for HeroSlider Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliderSliceDefault = prismic.SharedSliceVariation<
	'default',
	Record<string, never>,
	Simplify<HeroSliderSliceDefaultItem>
>;

/**
 * Slice variation for *HeroSlider*
 */
type HeroSliderSliceVariation = HeroSliderSliceDefault;

/**
 * HeroSlider Shared Slice
 *
 * - **API ID**: `hero_slider`
 * - **Description**: HeroSlider
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliderSlice = prismic.SharedSlice<'hero_slider', HeroSliderSliceVariation>;

/**
 * Primary content in *ImageDescription → Primary*
 */
export interface ImageDescriptionSliceDefaultPrimary {
	/**
	 * Title field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_description.primary.title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;

	/**
	 * Description field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_description.primary.description
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	description: prismic.KeyTextField;

	/**
	 * CTA Title field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_description.primary.cta_title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	cta_title: prismic.KeyTextField;

	/**
	 * CTA Link field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_description.primary.cta_link
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	cta_link: prismic.KeyTextField;

	/**
	 * Image field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_description.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;

	/**
	 * Show Image on the Left field in *ImageDescription → Primary*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: image_description.primary.image_left
	 * - **Documentation**: https://prismic.io/docs/field#boolean
	 */
	image_left: prismic.BooleanField;
}

/**
 * Default variation for ImageDescription Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageDescriptionSliceDefault = prismic.SharedSliceVariation<
	'default',
	Simplify<ImageDescriptionSliceDefaultPrimary>,
	never
>;

/**
 * Slice variation for *ImageDescription*
 */
type ImageDescriptionSliceVariation = ImageDescriptionSliceDefault;

/**
 * ImageDescription Shared Slice
 *
 * - **API ID**: `image_description`
 * - **Description**: ImageDescription
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageDescriptionSlice = prismic.SharedSlice<
	'image_description',
	ImageDescriptionSliceVariation
>;

/**
 * Default variation for NonPrismicContent Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NonPrismicContentSliceDefault = prismic.SharedSliceVariation<
	'default',
	Record<string, never>,
	never
>;

/**
 * Slice variation for *NonPrismicContent*
 */
type NonPrismicContentSliceVariation = NonPrismicContentSliceDefault;

/**
 * NonPrismicContent Shared Slice
 *
 * - **API ID**: `non_prismic_content`
 * - **Description**: NonPrismicContent
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type NonPrismicContentSlice = prismic.SharedSlice<
	'non_prismic_content',
	NonPrismicContentSliceVariation
>;

declare module '@prismicio/client' {
	interface CreateClient {
		(
			repositoryNameOrEndpoint: string,
			options?: prismic.ClientConfig
		): prismic.Client<AllDocumentTypes>;
	}

	namespace Content {
		export type {
			CollectionPageDocument,
			CollectionPageDocumentData,
			CollectionPageDocumentDataSlicesSlice,
			HomePageDocument,
			HomePageDocumentData,
			HomePageDocumentDataSlicesSlice,
			ProductPageDocument,
			ProductPageDocumentData,
			ProductPageDocumentDataSlicesSlice,
			AllDocumentTypes,
			CollectionSliderSlice,
			CollectionSliderSliceDefaultPrimary,
			CollectionSliderSliceVariation,
			CollectionSliderSliceDefault,
			HeroImageWithTextSlice,
			HeroImageWithTextSliceDefaultPrimary,
			HeroImageWithTextSliceVariation,
			HeroImageWithTextSliceDefault,
			HeroSliderSlice,
			HeroSliderSliceDefaultItem,
			HeroSliderSliceVariation,
			HeroSliderSliceDefault,
			ImageDescriptionSlice,
			ImageDescriptionSliceDefaultPrimary,
			ImageDescriptionSliceVariation,
			ImageDescriptionSliceDefault,
			NonPrismicContentSlice,
			NonPrismicContentSliceVariation,
			NonPrismicContentSliceDefault
		};
	}
}

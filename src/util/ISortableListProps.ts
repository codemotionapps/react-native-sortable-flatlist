/* tslint:disable no-any member-ordering */

import {
	LayoutChangeEvent,
	ListRenderItemInfo,
	ScrollViewProps,
	StyleProp,
	ViewabilityConfig,
	ViewStyle,
	ViewToken,
} from "react-native";

import { IContext } from "./context";

export interface IItem {
	key: string;
}

// Interface IItemProps {
// 	OnLayout(event: LayoutChangeEvent): void;
// }

interface IVirtualizedListProps extends ScrollViewProps {
	/**
	 * Rendered when the list is empty. Can be a React Component Class, a render function, or
	 * a rendered element.
	 */
	ListEmptyComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Rendered at the bottom of all the items. Can be a React Component Class, a render function, or
	 * a rendered element.
	 */
	ListFooterComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Rendered at the top of all the items. Can be a React Component Class, a render function, or
	 * a rendered element.
	 */
	ListHeaderComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * The default accessor functions assume this is an Array<{key: string}> but you can override
	 * getItem, getItemCount, and keyExtractor to handle any type of index-based data.
	 */
	data?: any;

	/**
	 * `debug` will turn on extra logging and visual overlays to aid with debugging both usage and
	 * implementation, but with a significant perf hit.
	 */
	debug?: boolean;

	/**
	 * DEPRECATED: Virtualization provides significant performance and memory optimizations, but fully
	 * unmounts react instances that are outside of the render window. You should only need to disable
	 * this for debugging purposes.
	 */
	disableVirtualization?: boolean;

	/**
	 * A marker property for telling the list to re-render (since it implements `PureComponent`). If
	 * any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the
	 * `data` prop, stick it here and treat it immutably.
	 */
	extraData?: any;

	/**
	 * A generic accessor for extracting an item from any sort of data blob.
	 */
	getItem?(data: any, index: number): IItem;

	/**
	 * Determines how many items are in the data blob.
	 */
	getItemCount?(data: any): number;

	getItemLayout?(
		data: any,
		index: number,
	): {
		length: number;
		offset: number;
		index: number;
	};

	horizontal?: boolean;

	/**
	 * How many items to render in the initial batch. This should be enough to fill the screen but not
	 * much more. Note these items will never be unmounted as part of the windowed rendering in order
	 * to improve perceived performance of scroll-to-top actions.
	 */
	initialNumToRender?: number;

	/**
	 * Instead of starting at the top with the first item, start at `initialScrollIndex`. This
	 * disables the "scroll to top" optimization that keeps the first `initialNumToRender` items
	 * always rendered and immediately renders the items starting at this initial index. Requires
	 * `getItemLayout` to be implemented.
	 */
	initialScrollIndex?: number;

	/**
	 * Reverses the direction of scroll. Uses scale transforms of -1.
	 */
	inverted?: boolean;

	keyExtractor?(item: IItem, index: number): string;

	listKey?: string;

	/**
	 * The maximum number of items to render in each incremental render batch. The more rendered at
	 * once, the better the fill rate, but responsiveness my suffer because rendering content may
	 * interfere with responding to button taps or other interactions.
	 */
	maxToRenderPerBatch?: number;

	onEndReached?: ((info: { distanceFromEnd: number }) => void) | null;

	onEndReachedThreshold?: number | null;

	onLayout?(event: LayoutChangeEvent): void;

	/**
	 * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
	 * sure to also set the `refreshing` prop correctly.
	 */
	onRefresh?: (() => void) | null;

	/**
	 * Used to handle failures when scrolling to an index that has not been measured yet.
	 * Recommended action is to either compute your own offset and `scrollTo` it, or scroll as far
	 * as possible and then try again after more items have been rendered.
	 */
	onScrollToIndexFailed?(info: {
		index: number;
		highestMeasuredFrameIndex: number;
		averageItemLength: number;
	}): void;

	/**
	 * Called when the viewability of rows changes, as defined by the
	 * `viewabilityConfig` prop.
	 */
	onViewableItemsChanged?: ((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void) | null;

	/**
	 * Set this when offset is needed for the loading indicator to show correctly.
	 * @platform android
	 */
	progressViewOffset?: number;

	/**
	 * Set this true while waiting for new data from a refresh.
	 */
	refreshing?: boolean | null;

	/**
	 * Note: may have bugs (missing content) in some circumstances - use at your own risk.
	 *
	 * This may improve scroll performance for large lists.
	 */
	removeClippedSubviews?: boolean;

	renderItem(info: ListRenderItemInfo<IItem>): React.ReactNode;

	/**
	 * Render a custom scroll component, e.g. with a differently styled `RefreshControl`.
	 */
	renderScrollComponent?(props: ScrollViewProps): React.ReactElement<ScrollViewProps>;

	/**
	 * Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off
	 * screen. Similar fill rate/responsiveness tradeoff as `maxToRenderPerBatch`.
	 */
	updateCellsBatchingPeriod?: number;

	viewabilityConfig?: ViewabilityConfig;

	/**
	 * Determines the maximum number of items rendered outside of the visible area, in units of
	 * visible lengths. So if your list fills the screen, then `windowSize={21}` (the default) will
	 * render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
	 * this number will reduce memory consumption and may improve performance, but will increase the
	 * chance that fast scrolling may reveal momentary blank areas of unrendered content.
	 */
	windowSize?: number;
}

export interface ISortableListPropsWithoutContext extends IVirtualizedListProps {
	/**
	 * Rendered in between each item, but not at the top or bottom
	 */
	ItemSeparatorComponent?: React.ComponentType<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Rendered when the list is empty.
	 */
	ListEmptyComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Rendered at the very end of the list.
	 */
	ListFooterComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Rendered at the very beginning of the list.
	 */
	ListHeaderComponent?: React.ComponentClass<any> | React.ReactElement<any> | (() => React.ReactElement<any>) | null;

	/**
	 * Optional custom style for multi-item rows generated when numColumns > 1
	 */
	columnWrapperStyle?: StyleProp<ViewStyle>;

	/**
	 * When false tapping outside of the focused text input when the keyboard
	 * is up dismisses the keyboard. When true the scroll view will not catch
	 * taps and the keyboard will not dismiss automatically. The default value
	 * is false.
	 */
	keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

	/**
	 * For simplicity, data is just a plain array. If you want to use something else,
	 * like an immutable list, use the underlying VirtualizedList directly.
	 */
	data: ReadonlyArray<IItem> | null;

	/**
	 * A marker property for telling the list to re-render (since it implements PureComponent).
	 * If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop,
	 * stick it here and treat it immutably.
	 */
	extraData?: any;

	/**
	 * `getItemLayout` is an optional optimization that lets us skip measurement of dynamic
	 * content if you know the height of items a priori. getItemLayout is the most efficient,
	 * and is easy to use if you have fixed height items, for example:
	 * ```
	 * getItemLayout={(data, index) => (
	 *   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
	 * )}
	 * ```
	 * Remember to include separator length (height or width) in your offset calculation if you specify
	 * `ItemSeparatorComponent`.
	 */
	getItemLayout?(data: IItem[] | null, index: number): { length: number; offset: number; index: number };

	/**
	 * If true, renders items next to each other horizontally instead of stacked vertically.
	 */
	horizontal?: boolean;

	/**
	 * How many items to render in the initial batch
	 */
	initialNumToRender?: number;

	/**
	 * Instead of starting at the top with the first item, start at initialScrollIndex
	 */
	initialScrollIndex?: number;

	/**
	 * Used to extract a unique key for a given item at the specified index. Key is used for caching
	 * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
	 * falls back to using the index, like React does.
	 */
	keyExtractor?(item: IItem, index: number): string;

	legacyImplementation?: boolean;

	/**
	 * Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout.
	 * Items should all be the same height - masonry layouts are not supported.
	 */
	numColumns?: number;

	/**
	 * Called once when the scroll position gets within onEndReachedThreshold of the rendered content.
	 */
	onEndReached?: ((info: { distanceFromEnd: number }) => void) | null;

	/**
	 * How far from the end (in units of visible length of the list) the bottom edge of the
	 * list must be from the end of the content to trigger the `onEndReached` callback.
	 * Thus a value of 0.5 will trigger `onEndReached` when the end of the content is
	 * within half the visible length of the list.
	 */
	onEndReachedThreshold?: number | null;

	/**
	 * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
	 * Make sure to also set the refreshing prop correctly.
	 */
	onRefresh?: (() => void) | null;

	/**
	 * Called when the viewability of rows changes, as defined by the `viewablePercentThreshold` prop.
	 */
	onViewableItemsChanged?: ((info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void) | null;

	/**
	 * Set this true while waiting for new data from a refresh.
	 */
	refreshing?: boolean | null;

	/**
	 * See `ViewabilityHelper` for flow type and further documentation.
	 */
	viewabilityConfig?: any;

	/**
	 * Note: may have bugs (missing content) in some circumstances - use at your own risk.
	 *
	 * This may improve scroll performance for large lists.
	 */
	removeClippedSubviews?: boolean;
}

export interface ISortableListProps extends ISortableListPropsWithoutContext {
	context: IContext;
}

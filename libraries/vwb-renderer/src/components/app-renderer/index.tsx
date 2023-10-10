import { VWBApplication, VWBPage, applicationValidate } from '@compass-aiden/vwb-core';
import VWBPageRenderer, { VWBPageRendererProps } from '@/components/page-renderer';

export interface VWBAppRendererProps {
  appConfig: VWBApplication;
  selectedPageId?: string;
  setSelectPageId?: (id?: string) => void;
  pageProps?: Omit<VWBPageRendererProps, 'pageConfig'>;
}

export interface VWBAppRendererRef {
  getCurrentPageConfig: () => VWBPage | undefined;
}

const VWBAppRenderer = forwardRef<VWBAppRendererRef, VWBAppRendererProps>(
  ({ appConfig, pageProps, selectedPageId, setSelectPageId }, ref) => {
    const [pageConfig, setPageConfig] = useState<VWBPage | undefined>();

    useEffect(() => {
      if (!applicationValidate(appConfig)) {
        throw new Error('The acquired app data is not the expected data.');
      }
      if (selectedPageId) {
        const pageConf = appConfig.pages.find((page: VWBPage) => page.id === selectedPageId);
        setPageConfig(pageConf);
      } else if (appConfig.pages[0]) {
        setSelectPageId?.(appConfig.pages[0]?.id);
      }
    }, [appConfig, selectedPageId, setSelectPageId]);

    function getCurrentPageConfig(): VWBPage | undefined {
      return pageConfig;
    }

    useImperativeHandle(ref, () => ({
      getCurrentPageConfig,
    }));

    return (
      <>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {pageConfig && <VWBPageRenderer mode={appConfig.mode} pageConfig={pageConfig} {...(pageProps || {})} />}
      </>
    );
  },
);

export default VWBAppRenderer;

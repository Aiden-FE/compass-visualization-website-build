import { useState, useEffect } from 'react';
import get from 'lodash-es/get';
import { Skeleton } from 'antd';
import { CommonComponentProps } from '@/interfaces';

type ISystemComponentProps = CommonComponentProps<{
  /** umd文件地址 */
  umdUrl: string;
  /** 导出的名称 */
  exportName?: string;
  /** 透传给umd组件的属性 */
  attrs?: any;
  children?: React.ReactElement;
}>;

function AppRemoteComponent({ children, umdUrl, exportName, attrs }: ISystemComponentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [SysCom, setSysCom] = useState<any>(null);

  useEffect(() => {
    if (!umdUrl) return;
    System?.import(umdUrl)
      .then((Com) => {
        const Component = get(Com, exportName || 'default');

        // 这里需要注意的是，res 因为是组件，所以类型是 function
        // 而如果直接 setSysCom 可以接受函数或者值，如果直接传递 setSysCom(Com)，则内部会先执行这个函数，则会报错
        // 所以值为函数的场景下，必须是 如下写法
        if (Component) {
          setSysCom(() => Component);
        } else {
          throw new Error('未找到组件');
        }
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [umdUrl, exportName]);

  if (!umdUrl || error) {
    // eslint-disable-next-line no-console
    console.error('载入远程模块失败,url不存在或发生异常: ', error, umdUrl);
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Skeleton loading={loading}>{SysCom && <SysCom {...attrs}>{children}</SysCom>}</Skeleton>;
}

export default AppRemoteComponent;

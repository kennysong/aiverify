import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import ProjectTemplateModule from 'src/modules/projectTemplate';
import ProjectTemplate from 'src/types/projectTemplate.interface';
import PluginManagerType from 'src/types/pluginManager.interface';
import { getPlugins } from 'server/pluginManager';

import { getProjectTemplate } from 'server/lib/projectServiceBackend';

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const id = params!.id as string;
  const data = await getProjectTemplate(id)
  const pluginManager = await getPlugins();
  return {
    props: {
      pluginManager,
      data
    },
  }
}

type Props = {
  data: ProjectTemplate,
  pluginManager: PluginManagerType
}

export default function ProjectUpdatePage({data, pluginManager}: Props) {
  const router = useRouter()
  const { pid } = router.query

  return (<ProjectTemplateModule data={data} pluginManager={pluginManager} />)
}
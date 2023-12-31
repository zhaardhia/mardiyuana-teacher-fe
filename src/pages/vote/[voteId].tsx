import Layout from "@/components/Layout";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const VoteDetail = () => {
  const router = useRouter();
  const { voteId } = router.query;

  const [voteChoosen, setVoteChoosen] = useState("");
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8 w-[90%] mx-auto max-w-[1400px]">
        <h1 className="text-2xl font-semibold">Vote</h1>
        <p>Jumat, 3 Desember 1945</p>
      </div>

      <hr className="h-[2px] bg-[#AFAFAF]" />

      <div className="my-5 flex items-center w-[90%] mx-auto max-w-[1400px]">
        <Icon icon="formkit:arrowleft" className="cursor-pointer h-full w-10" onClick={() => router.back()} />
        <h2 className="font-semibold text-2xl w-full text-center mt-5">Study Tour: Parayangan Farm</h2>
      </div>

      <div className="h-[300px] mt-7">
        <img src="/school_event.png" alt="" className="h-full object-cover w-full" />
      </div>

      <div className="my-8 flex items-center w-[90%] mx-auto max-w-[1400px]">
        <p className="text-lg text-justify indent-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quae! Consectetur dicta natus tempora
          similique harum magnam officiis temporibus dolores expedita odio eius, quam nesciunt quidem ut. Exercitationem
          dolorem qui, enim distinctio optio in voluptate placeat iusto explicabo iure culpa quibusdam quis libero nulla
          cupiditate recusandae harum ad incidunt reprehenderit eius tempore iste, voluptas aspernatur quasi. Dolore
          voluptatibus officia quas neque nemo ipsum veritatis dolores aut ipsa rem sint unde incidunt, quaerat repellat
          eveniet delectus perspiciatis itaque fugit numquam mollitia excepturi. Reprehenderit nihil dolore, aliquam ut
          quidem illum officia non nulla corrupti laudantium velit. Quis hic aut quod eaque sapiente. Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Eaque quod blanditiis reprehenderit facilis dolore quasi earum,
          ducimus id libero quo illum officia error atque possimus. Sint doloribus earum necessitatibus quam iste,
          mollitia, modi explicabo deserunt voluptatibus aspernatur exercitationem adipisci. Saepe modi dolores,
          suscipit laborum itaque enim officia, totam ipsam tempore ab deleniti vero mollitia, ipsa ad velit? Voluptates
          praesentium eveniet recusandae nisi repellat! Obcaecati voluptates tempore officia nostrum officiis!
          Voluptatem perspiciatis repellat blanditiis hic earum sit doloremque ducimus, quia quaerat quis qui. Eaque
          quisquam dolorum repellat deleniti minus, atque eum doloremque. Ullam assumenda temporibus ea possimus labore
          ipsam. Delectus aspernatur tempore pariatur quibusdam facilis enim in eaque hic culpa? Voluptates quidem
          labore minima, fugit, ipsum dignissimos fugiat, illum obcaecati culpa officia veniam saepe tempora atque non
          modi iusto doloremque quisquam. Aliquam sequi ab deserunt distinctio maxime fuga ex temporibus dolor, placeat
          rerum vel minima veniam in! Porro saepe laborum voluptas nisi excepturi hic. Tempora quam minus repellendus?
          Nulla illum a earum necessitatibus obcaecati corrupti at ipsam amet placeat, ipsum perferendis, quam
          exercitationem facere assumenda doloribus reiciendis? Debitis beatae architecto dolores eos illum eveniet nisi
          eum ab voluptatem. Libero dolorum eius, cumque nobis velit aut sit, quae expedita ipsam perferendis
          blanditiis. Molestiae porro alias, facere aliquid odio aliquam distinctio id provident earum nisi quos laborum
          ullam, tempora explicabo quisquam commodi, ex voluptate minima numquam sapiente? Recusandae pariatur dolores
          minus saepe enim id, alias doloribus doloremque deserunt odio aperiam laboriosam provident perferendis. Quae
          ipsa libero dolore et quas a, quis ad sed? A voluptatibus fugiat eius quaerat, adipisci quas sit laborum,
          recusandae, aliquam blanditiis rerum temporibus ipsam commodi officia voluptates itaque tenetur doloribus
          architecto distinctio quis ipsa eum deserunt aperiam. Aspernatur dolorum omnis quibusdam velit animi repellat
          non. Iste alias quos dolore nam provident earum voluptate veniam, corrupti velit asperiores, eaque dolorem?
          Vel tempore sunt maiores amet eius quibusdam accusantium dignissimos laudantium natus aut eveniet odit animi
          porro eaque ullam, iure necessitatibus possimus? Quae saepe maxime laboriosam, facere itaque nulla ex ea,
          distinctio consequatur odio officiis. Unde ad optio id a quos? Dignissimos, blanditiis deserunt? Eveniet
          temporibus atque, iste placeat non nihil sequi error eos. Expedita consectetur in exercitationem animi vero.
          Adipisci odio amet, unde molestiae veniam reiciendis nihil exercitationem non, odit praesentium, quod aliquid
          ab aliquam harum. Cumque et voluptates tempora unde vero, ut architecto, tenetur quidem minus modi, reiciendis
          recusandae illo molestiae accusamus quo nihil odio! Dolorum, obcaecati nostrum dolores voluptate consectetur,
          enim recusandae eum natus corporis eligendi officia explicabo quas aspernatur eaque! Nesciunt, natus? Quis
          repellendus debitis totam quasi voluptatibus quia voluptates eligendi tenetur, sunt maiores culpa, similique
          fugit nemo dignissimos porro quibusdam cupiditate? Laboriosam repudiandae id, reprehenderit est consectetur
          autem a tempora dicta, molestiae fugiat reiciendis nam perferendis labore quos accusamus, illum doloremque?
          Odio officiis eum vel asperiores similique sit molestias magnam obcaecati veritatis nostrum nesciunt, quod
          alias cupiditate mollitia. Magnam obcaecati suscipit inventore modi perferendis. Inventore, corporis.
          Quibusdam dolorum optio aliquid atque minus eligendi. Aspernatur officia porro mollitia necessitatibus? Soluta
          quis vero quod saepe, asperiores perspiciatis autem?
        </p>
      </div>

      <div className="my-8 flex flex-col w-[90%] mx-auto max-w-[1400px]">
        <h2 className="font-semibold text-2xl">Votes</h2>
        <p className="italic mb-3">Choose whether agree or disagree correspond to the vote</p>

        <div className="flex flex-col gap-2">
          <div
            className={`${
              voteChoosen === "agree" ? "border-green-500" : "border-transparent"
            } border p-1 transition-all rounded-full w-1/4`}
          >
            <div
              className="w-full h-8 bg-white rounded-full dark:bg-gray-700 cursor-pointer"
              onClick={() => {
                if (voteChoosen === "agree") {
                  setVoteChoosen("");
                  return;
                }
                setVoteChoosen("agree");
              }}
            >
              <div className="h-8 bg-green-500 w-[70%] rounded-full dark:bg-green-300 pl-2 flex items-center">
                <div className="flex items-center gap-3 text-black font-medium">
                  <Icon icon="material-symbols:person" className="w-5 h-5" />
                  <p className="w-32">70% Agree</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              voteChoosen === "disagree" ? "border-red-500" : "border-transparent"
            } border p-1 transition-all rounded-full w-1/4`}
          >
            <div
              className="w-full h-8 bg-white rounded-full dark:bg-gray-700 cursor-pointer"
              onClick={() => {
                if (voteChoosen === "disagree") {
                  setVoteChoosen("");
                  return;
                }
                setVoteChoosen("disagree");
              }}
            >
              <div className="h-8 bg-red-500 w-[40%] rounded-full dark:bg-red-300 pl-2 flex items-center">
                <div className="flex items-center gap-3 text-black font-medium">
                  <Icon icon="material-symbols:person" className="w-5 h-5" />
                  <p className="w-32">40% Disagree</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {voteChoosen && (
          <p className={`${voteChoosen === "agree" ? "text-green-700" : "text-red-700"}`}>
            You've voted <span className="capitalize font-medium">{voteChoosen}</span>
          </p>
        )}
      </div>
    </Layout>
  );
};

export default VoteDetail;

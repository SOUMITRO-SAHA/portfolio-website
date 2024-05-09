import { PageWrapper } from "@/components/PageWrapper";
import { PageTitle } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils";
import {
  CheckCheck,
  Ellipsis,
  GitPullRequestArrow,
  MoveUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

const openSourceDemoData = [
  {
    id: "abdcd",
    repositoryName: "bookmarker",
    repositoryLink: "https://www.github.com/SOUMITRO-SAHA/bookmarker",
    isPRMerged: true,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptas ducimus ea aperiam culpa consequatur porro quas voluptate earum, doloremque cumque libero labore quis, atque numquam recusandae debitis. Facilis quis quas labore velit?",
    issueLink: "https://github.com/fada",
    prLink: "https://github.com/",
  },
  {
    id: "efgh",
    repositoryName: "dub",
    repositoryLink: "https://www.github.com/SOUMITRO-SAHA/bookmarker",
    isPRMerged: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptas ducimus ea aperiam culpa consequatur porro quas voluptate earum, doloremque cumque libero labore quis, atque numquam recusandae debitis. Facilis quis quas labore velit?",
    issueLink: "https://github.com/fada",
    prLink: "https://github.com/",
  },
  {
    id: "efgh",
    repositoryName: "quiver",
    repositoryLink: "https://www.github.com/SOUMITRO-SAHA/bookmarker",
    isPRMerged: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptas ducimus ea aperiam culpa consequatur porro quas voluptate earum, doloremque cumque libero labore quis, atque numquam recusandae debitis. Facilis quis quas labore velit?",
    issueLink: "https://github.com/fada",
    prLink: "https://github.com/",
  },
];

const OpenSourcePage = () => {
  return (
    <PageWrapper>
      <ScrollArea className="h-screen">
        <PageTitle
          title="Open Source Contributions"
          icon={<GitPullRequestArrow className="h-5 w-5" />}
        />

        {/* Tags + Filter */}
        {/* Cards */}

        {openSourceDemoData.length > 1 && (
          <div className="my-12 grid w-full grid-cols-12 gap-8">
            {openSourceDemoData.map(
              ({
                id,
                repositoryName,
                repositoryLink,
                prLink,
                issueLink,
                isPRMerged,
                description,
              }) => (
                <div
                  key={id}
                  className="col-span-4 rounded-xl bg-slate-700 p-8 shadow-md shadow-primary-foreground"
                >
                  {/* Title */}
                  <Link
                    href={repositoryLink ?? ""}
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="flex items-center gap-2 text-xl font-bold lowercase">
                        <Zap className="h-4 w-4 fill-rose-400 stroke-rose-400" />
                        <span>{repositoryName}</span>
                      </h3>
                      <Badge className="bg-amber-200 text-xs font-medium capitalize">
                        <span className="mr-2">Merged</span>
                        {isPRMerged ? (
                          <CheckCheck className="h-4 w-4" />
                        ) : (
                          <Ellipsis className="h-4 w-4" />
                        )}
                      </Badge>
                    </div>
                  </Link>

                  {/* Links */}
                  <div className="my-3 flex items-center gap-5">
                    <Link
                      href={issueLink}
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "xs",
                        }),
                        "rounded-full",
                      )}
                    >
                      <span>View Issue</span>
                      <MoveUpRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={prLink ?? ""}
                      className={cn(
                        buttonVariants({
                          size: "xs",
                        }),
                        "rounded-full",
                      )}
                    >
                      <span className="mr-2">View Pull Rreq.</span>
                      <MoveUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400">{description.slice(0, 100)}</p>
                </div>
              ),
            )}
          </div>
        )}
      </ScrollArea>
    </PageWrapper>
  );
};

export default OpenSourcePage;
